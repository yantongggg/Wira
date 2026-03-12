import { Outlet, NavLink } from "react-router";
import { Home, Map, View, Radio } from "lucide-react";

export function Layout() {
  const navItems = [
    { name: "Home", to: "/", icon: Home },
    { name: "Atlas", to: "/atlas", icon: Map },
    { name: "AR", to: "/ar", icon: View },
    { name: "Survival", to: "/survival", icon: Radio },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 sticky bottom-0">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-300 ease-spring ${
                isActive
                  ? "text-blue-500 scale-110"
                  : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-2xl transition-colors duration-300 ${
                    isActive ? "bg-blue-50" : "bg-transparent"
                  }`}
                >
                  <item.icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "fill-blue-100" : "fill-transparent"}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-wide">
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
