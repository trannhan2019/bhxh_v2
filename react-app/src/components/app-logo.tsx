import LogoImg from "@/assets/images/logo.png";

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <img src={LogoImg} className="size-8" />
      <span className="font-semibold">SBA - BHXH</span>
    </div>
  );
}
