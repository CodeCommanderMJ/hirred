import { Outlet } from "react-router-dom";
import Header from "@/components/ui/header";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* 🔥 Background Grid (Click-through) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Outlet />
      </div>

    </div>
  );
};

export default AppLayout;
