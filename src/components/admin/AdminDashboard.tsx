import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Briefcase, Calendar, Users, LogOut, Menu, X } from 'lucide-react';
import AdminNotes from './AdminNotes';
import AdminProjects from './AdminProjects';
import AdminSessions from './AdminSessions';
import AdminEvents from './AdminEvents';
import AdminLeadership from './AdminLeadership';

interface AdminDashboardProps {
  setCurrentPage: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState('notes');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'notes', label: 'Notes Management', icon: BookOpen },
    { id: 'projects', label: 'Projects Management', icon: Briefcase },
    { id: 'sessions', label: 'Sessions Management', icon: Calendar },
    { id: 'events', label: 'Events Management', icon: Calendar },
    { id: 'leadership', label: 'Leadership Management', icon: Users },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'notes':
        return <AdminNotes />;
      case 'projects':
        return <AdminProjects />;
      case 'sessions':
        return <AdminSessions />;
      case 'events':
        return <AdminEvents />;
      case 'leadership':
        return <AdminLeadership />;
      default:
        return <AdminNotes />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="bg-primary-600 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-primary-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:transition-none`}
          style={{ marginTop: '73px' }}
        >
          <div className="h-full overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            style={{ marginTop: '73px' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0" style={{ marginTop: '73px' }}>
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

