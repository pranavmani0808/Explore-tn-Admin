import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface StaffShellProps {
  children: React.ReactNode;
  breadcrumbs?: string[];
}

export const StaffShell: React.FC<StaffShellProps> = ({ children, breadcrumbs }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d12] text-zinc-100 flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onCloseMobile={() => setSidebarOpen(false)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
