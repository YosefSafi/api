import type { Metadata } from "next";
import "./globals.css";
import { LayoutDashboard, History, Settings, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Aiko Decision Platform",
  description: "AI-Driven Smart Decision Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div style={{ padding: '2rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              AIKO PLATFORM
            </div>
            <nav style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', background: '#3b82f620', color: 'var(--primary)', cursor: 'pointer' }}>
                <LayoutDashboard size={20} /> Dashboard
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}>
                <History size={20} /> History
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}>
                <User size={20} /> Profile
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}>
                <Settings size={20} /> Settings
              </div>
            </nav>
          </aside>
          <main className="main-content">
            <header className="header">
              <div style={{ flex: 1 }}>Overview</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#a3a3a3' }}>Admin User</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)' }}></div>
              </div>
            </header>
            <div className="content">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
