import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-x-hidden bg-slate-500 text-white">
      {children}
    </div>
  );
};

export default Layout;
