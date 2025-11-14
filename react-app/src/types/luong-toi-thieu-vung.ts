export type TLuongToiThieuVung = {
    id:number;
    mucLuong:number;
    thoiGianApDung:Date;
    apDung: boolean;
    canCuPhapLy: string | null;
}

export const LuongToiThieuVungDefaultValues: Omit<TLuongToiThieuVung, "id"> = {
    mucLuong: 0,
    thoiGianApDung: new Date(),
    apDung: false,
    canCuPhapLy: '',
}
