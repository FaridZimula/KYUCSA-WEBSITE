import React, { useState } from 'react';
import { BookOpen, Briefcase, Calendar, Users, LogOut, Menu, X, Handshake, MessageSquare, Megaphone, Settings } from 'lucide-react';
import AdminNotes from './AdminNotes';
import AdminProjects from './AdminProjects';
import AdminSessions from './AdminSessions';
import AdminLeadership from './AdminLeadership';
import AdminPartners from './AdminPartners';
import AdminPresidentMessage from './AdminPresidentMessage';
import AdminSettings from './AdminSettings';
import AdminAnnouncements from './AdminAnnouncements';
import { authManager } from '../../utils/dataManager';

interface AdminDashboardProps {
  setCurrentPage: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState('notes');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'notes', label: 'Notes Management', icon: BookOpen },
    { id: 'projects', label: 'Projects Management', icon: Briefcase },
    { id: 'sessions', label: 'Sessions & Events', icon: Calendar },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'partners', label: 'Partners', icon: Handshake },
    { id: 'president', label: 'President\'s Message', icon: MessageSquare },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await authManager.logout();
    setCurrentPage('login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'notes':
        return <AdminNotes />;
      case 'projects':
        return <AdminProjects />;
      case 'sessions':
        return <AdminSessions />;
      case 'leadership':
        return <AdminLeadership />;
      case 'partners':
        return <AdminPartners />;
      case 'president':
        return <AdminPresidentMessage />;
      case 'announcements':
        return <AdminAnnouncements />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminNotes />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2 text-primary-600">
              <img src="/KYUCSA LOGO.png" alt="KYUCSA Logo" className="h-12 w-auto object-contain" />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white hover:bg-secondary-600 rounded-lg transition-colors text-sm font-medium shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary-900 border-r border-primary-800 shadow-sm transition-transform duration-300 ease-in-out lg:shadow-none flex flex-col`}
          style={{ top: '64px', height: 'calc(100vh - 64px)' }}
        >
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                      ? 'bg-primary-800 text-white font-semibold shadow-sm ring-1 ring-primary-700'
                      : 'text-primary-100 hover:bg-primary-800/50 hover:text-white'
                      } `}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors ${isActive ? 'text-secondary-400' : 'text-primary-300 group-hover:text-white'
                        } `}
                    />
                    <span className="text-sm text-left">{item.label}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary-400" />}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-secondary-600 bg-secondary-500">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-secondary-600 font-bold shadow-sm shrink-0">A</div>
              <div className="text-xs">
                <p className="font-medium text-white">Administrator</p>
                <p className="text-secondary-100">admin@kyucsa.org</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            style={{ top: '64px' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

