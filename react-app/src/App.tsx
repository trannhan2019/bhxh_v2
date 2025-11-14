import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import GuestGuard from "./components/guard/guest-guard";
import AppLayout from "./layouts/app/app-layout";
import AuthGuard from "./components/guard/auth-guard";

const Login = lazy(() => import("./pages/auth/login"));
const Bhxh = lazy(() => import("./pages/bhxh/bhxh"));
const Phong = lazy(() => import("./pages/phong/phong"));
const ChucVu = lazy(() => import("./pages/chuc-vu/chuc-vu"));
const NhanVien = lazy(() => import("./pages/nhan-vien/nhan-vien"));
const LuongToiThieuVung = lazy(() => import("./pages/luong-toi-thieu-vung/luong-toi-thieu-vung"));
const BacLuong = lazy(() => import("./pages/bac-luong/bac-luong"));
const HeSo = lazy(() => import("./pages/he-so/he-so"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/bhxh" />}/>
      
      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />


      <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
        <Route path="/bhxh" element={<Bhxh />} />
        <Route path="/phong" element={<Phong />} />
        <Route path="/chuc-vu" element={<ChucVu />} />
        <Route path="/nhan-vien" element={<NhanVien />} />
        <Route path="/luong-toi-thieu-vung" element={<LuongToiThieuVung />} />
        <Route path="/bac-luong" element={<BacLuong />} />
        <Route path="/he-so" element={<HeSo />} />
      </Route>
    </Routes>
  );
}

export default App;
