import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DateInputPickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const DATE_FORMAT = "dd/MM/yyyy";

export function DateInputPicker({
  value,
  onChange,
  disabled,
  className,
  placeholder = "dd/mm/yyyy",
}: DateInputPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value ? format(value, DATE_FORMAT) : "");

  // Sync inputValue when value changes from outside (edit case)
  React.useEffect(() => {
    setInputValue(value ? format(value, DATE_FORMAT) : "");
  }, [value]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    const parsed = parse(e.target.value, DATE_FORMAT, new Date());
    // Check if parsed is a valid date with same format
    if (
      e.target.value.length === 10 &&
      !isNaN(parsed.getTime()) &&
      format(parsed, DATE_FORMAT) === e.target.value
    ) {
      onChange(parsed);
    } else {
      onChange(null);
    }
  }

  function handleCalendarSelect(date?: Date) {
    if (date) {
      setInputValue(format(date, DATE_FORMAT));
      onChange(date);
      setOpen(false);
    }
  }

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={10}
        disabled={disabled}
        pattern="\d{2}/\d{2}/\d{4}"
        inputMode="numeric"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled}
            aria-label="Chọn ngày"
          >
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={handleCalendarSelect}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}