-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Phong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ChucVu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "NhanVien" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "phongId" INTEGER NOT NULL,
    "chucVuId" INTEGER NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0,
    "trangThai" BOOLEAN NOT NULL DEFAULT true,
    "daNghiViec" DATETIME,
    "nhanVienVhsc" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "NhanVien_phongId_fkey" FOREIGN KEY ("phongId") REFERENCES "Phong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NhanVien_chucVuId_fkey" FOREIGN KEY ("chucVuId") REFERENCES "ChucVu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LuongToiThieuVung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mucLuong" INTEGER NOT NULL,
    "thoiGianApDung" DATETIME NOT NULL,
    "canCuPhapLy" TEXT,
    "apDung" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "NgachLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenNgach" TEXT NOT NULL,
    "maNgach" TEXT NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "BacLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bac" INTEGER NOT NULL,
    "heSo" REAL NOT NULL,
    "thoiGianNangBac" INTEGER NOT NULL,
    "ngachLuongId" INTEGER NOT NULL,
    CONSTRAINT "BacLuong_ngachLuongId_fkey" FOREIGN KEY ("ngachLuongId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HeSo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chucDanh" TEXT NOT NULL,
    "heSo" REAL NOT NULL,
    "loai" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bhxh" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "ngachLuongId" INTEGER NOT NULL,
    "bacLuongId" INTEGER NOT NULL,
    "heSoChucVuId" INTEGER,
    "heSoTrachNhiemId" INTEGER,
    "ngayApDung" DATETIME NOT NULL,
    "ghiChu" TEXT,
    "soThuTu" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Bhxh_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bhxh_ngachLuongId_fkey" FOREIGN KEY ("ngachLuongId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bhxh_bacLuongId_fkey" FOREIGN KEY ("bacLuongId") REFERENCES "BacLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bhxh_heSoChucVuId_fkey" FOREIGN KEY ("heSoChucVuId") REFERENCES "HeSo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Bhxh_heSoTrachNhiemId_fkey" FOREIGN KEY ("heSoTrachNhiemId") REFERENCES "HeSo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bhxh_nhanVienId_key" ON "Bhxh"("nhanVienId");
