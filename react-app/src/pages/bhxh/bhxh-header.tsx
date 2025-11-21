import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import type { TBhxhItem } from '@/types/bhxh';
import { Plus, Search, Trash2 } from 'lucide-react';

interface Props {
    search: string;
    setSearch: (search: string) => void;
    handleOpenModal: (item: TBhxhItem | null) => void;
    handleSearchSubmit: (search: string) => void;
}

export function BhxhHeader({ search, setSearch, handleOpenModal, handleSearchSubmit }: Props) {

    const handleSearch = (value:string) => {
        // e.preventDefault();
        setSearch(value)
        handleSearchSubmit(value);
    };

    return (
        <div className="flex justify-between rounded-xl border bg-white p-3">
            <div>
                <Button onClick={() => handleOpenModal(null)}>
                    <Plus /> Thêm
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <InputGroup className="w-80 border-primary">
                    <InputGroupInput
                        onChange={(e) => handleSearch(e.target.value)}
                        value={search}
                        type="text"
                        placeholder="Tìm theo tên nhân viên ..."
                    />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Button
                            variant={'link'}
                            size={'icon'}
                            disabled={!search}
                            onClick={() => handleSearch('')}
                        >
                            <Trash2 color="red" />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
}