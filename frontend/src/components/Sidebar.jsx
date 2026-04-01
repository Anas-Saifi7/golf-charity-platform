import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
 const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menu = [
    { path: "/dashboard", icon: "📊", label: "Overview" },
    { path: "/draw", icon: "🎲", label: "Draw" },
    { path: "/charity", icon: "💚", label: "Charity" },
    { path: "/subscription", icon: "💳", label: "Subscription" },
    { path: "/winnings", icon: "🏆", label: "Winnings" },

    // 🔥 ADMIN ONLY
    ...(user?.role === "admin"
      ? [{ path: "/admin", icon: "🛠️", label: "Admin Panel" }]
      : [])
  ];

  return (
    <>
      {/* 🔥 HAMBURGER (MOBILE) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1A3A2A] text-white p-2 rounded"
      >
        ☰
      </button>

      {/* 🔥 SIDEBAR */}
      <div
        className={`bg-[#1A3A2A] text-white w-64 h-screen fixed top-0 left-0 z-40 flex flex-col justify-between transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* LOGO */}
        <div>
          <h2 className="p-6 text-xl font-bold">
            Green<span className="text-yellow-400">Heart</span>
          </h2>

          {/* USER */}
          <div className="px-6 pb-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-semibold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-300">
                {user?.role === "admin" ? "Admin" : "User"}
              </p>
              <p className="text-xs text-gray-300">
                {user?.subscription?.plan || "No Plan"} · {user?.subscription?.status || "Inactive"}
              </p>
            </div>
          </div>

          {/* NAV */}
          <div className="p-4 space-y-2 text-sm">
            {menu.map((item) => (
              <div
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false); // close on mobile
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition
                  ${location.pathname === item.path
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-white/10"
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-sm text-gray-300 hover:text-white"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;