import LogoImg from "@/assets/images/logo.png";

export function AppLogo() {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-md">
      <img src={LogoImg} />
      <span className="mb-0.5 truncate leading-tight font-semibold">SBA</span>
    </div>
  );
}
