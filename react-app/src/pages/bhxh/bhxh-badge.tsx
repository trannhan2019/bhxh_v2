import { Badge } from '@/components/ui/badge';
import { formatBadgeColorByDate, formatViDate } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

interface Props {
    daMaxBac: Boolean;
    thoiGianNangBacTiepTheo: Date | null;
}

export function BhxhBadge({ daMaxBac, thoiGianNangBacTiepTheo }: Props) {
    return (
        <>
            {daMaxBac ? (
                <Badge variant="outline">
                    <BadgeCheck color="green" />
                    Đã max bậc
                </Badge>
            ) : (
                <Badge
                    variant={'outline'}
                    className={`text-white ${formatBadgeColorByDate(thoiGianNangBacTiepTheo)}`}
                >
                    {formatViDate(thoiGianNangBacTiepTheo)}
                </Badge>
            )}
        </>
    );
}