
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { TNgachLuong } from "@/types/bac-luong";
import { Edit3Icon, Trash2Icon } from 'lucide-react';

interface Props {
    data: TNgachLuong;
    handleOpenModal: (item: TNgachLuong | null) => void;
    handleDelAlert: (id: number) => void;
}


export function BacLuongCard({data, handleOpenModal, handleDelAlert}: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{data.tenNgach}</CardTitle>
                <CardDescription>
                    Mã ngạch lương: {data.maNgach}
                </CardDescription>
                <CardAction>
                    <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => handleOpenModal(data)}
                    >
                        <Edit3Icon />
                    </Button>
                    <Button
                        className="ml-2"
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => handleDelAlert(data.id)}
                    >
                        <Trash2Icon color="red" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bậc</TableHead>
                            <TableHead>Hệ số</TableHead>
                            <TableHead>Thời gian nâng bậc (năm)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.bacLuongs.map((bacLuong) => (
                            <TableRow key={bacLuong.id}>
                                <TableCell>{bacLuong.bac}</TableCell>
                                <TableCell>
                                    {bacLuong.heSo.toLocaleString('vi-VN')}
                                </TableCell>
                                <TableCell>
                                    {bacLuong.thoiGianNangBac}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}