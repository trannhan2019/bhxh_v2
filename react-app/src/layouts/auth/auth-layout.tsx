import bgImage from "@/assets/images/login-bg.jpg";
import logo from "@/assets/images/logo.png";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        // Thiết lập nền như hình ảnh
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl backdrop-blur-sm bg-opacity-95">
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center mb-6">
          {/* Placeholder cho Logo (Biểu tượng ngôi sao 4 cánh màu đỏ-xanh) */}
          <div className="w-12 h-12 mb-3">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">
            SBA BHXH
          </h1>
        </div>

        {/* Login Form */}
        {children}

        {/* Footer Content */}
        <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
          <p className="text-xs">Digital BHXH v1.0.0</p>
          <hr className="my-2 border-gray-200" />

          <p className="text-[10px] leading-relaxed">
            Bộ phận hỗ trợ người dùng:
            <br />
            <span className="font-semibold text-gray-700">
              HOTLINE: 0236 3 653.592
            </span>
            <br />
            - Email: phongtochuchanhchinh.sba@gmail.com
            <br />- Zalo: 0935243011
          </p>
        </div>
      </div>
    </div>
    )
}