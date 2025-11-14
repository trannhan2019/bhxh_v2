import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns"; // Chỉ cần dùng cho dd/MM/yyyy
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DateInputPickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

const DATE_FORMAT = "dd/MM/yyyy";

function formatDate_ddmmyyyy(date?: Date | null) {
  if (!date) return "";
  return format(date, DATE_FORMAT);
}

function isValid_ddmmyyyy(dateStr: string) {
  if (dateStr.length !== 10) return false;
  const parsed = parse(dateStr, DATE_FORMAT, new Date());
  return !isNaN(parsed.getTime()) && format(parsed, DATE_FORMAT) === dateStr;
}

export function DateInputPicker({
  value,
  onChange,
  disabled,
  className,
  label,
  placeholder = "dd/mm/yyyy",
}: DateInputPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value ?? undefined);
  const [inputValue, setInputValue] = React.useState(formatDate_ddmmyyyy(value));

  React.useEffect(() => {
    setInputValue(formatDate_ddmmyyyy(value));
    if (value) setMonth(value);
  }, [value]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    if (isValid_ddmmyyyy(val)) {
      const date = parse(val, DATE_FORMAT, new Date());
      onChange(date);
      setMonth(date);
    } else {
      onChange(null);
    }
  }

  function handleCalendarSelect(date?: Date) {
    if (date) {
      setInputValue(formatDate_ddmmyyyy(date));
      onChange(date);
      setMonth(date);
      setOpen(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label htmlFor="date-input">{label}</Label>}
      <div className="relative flex gap-2 items-center">
        <Input
          id="date-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={10}
          pattern="\d{2}/\d{2}/\d{4}"
          inputMode="numeric"
          disabled={disabled}
          className="bg-background pr-10"
          onKeyDown={e => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              disabled={disabled}
              type="button"
            >
              <CalendarIcon className="size-4" />
              <span className="sr-only">Chọn ngày</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={value ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}