import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Academic Resources', id: 'notes' },
    { name: 'Projects', id: 'projects' },
    {
      name: 'Leadership',
      id: 'leadership',
      subItems: [
        { name: 'Cabinet', id: 'leadership' },
        { name: 'Dean\'s Message', id: 'dean' },
        { name: 'H.O.D\'s Message', id: 'hod' },
        { name: 'Patron\'s Message', id: 'patron' }
      ]
    },
    { name: 'Sessions', id: 'sessions' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary-500 text-white text-xs sm:text-sm py-2">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* External Links */}
          <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-hide items-center gap-4 font-medium w-full sm:w-auto px-1">
            <a href="https://scis.kyu.ac.ug/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Our School Website</a>
            <a href="https://kyu.ac.ug/admission-lists/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Admission Lists</a>
            <a href="https://kyu.ac.ug/applications/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Online Applications</a>
            <a href="https://kyu.ac.ug/fees-structures/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Fees Structures</a>
            <a href="https://kyu.ac.ug/category/university-news/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">News</a>
            <a href="https://kyu.ac.ug/download-category/downloads/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Downloads</a>
            <a href="https://kyu.ac.ug/scholarship/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">Scholarships</a>
          </div>

          <button
            onClick={() => setCurrentPage('announcements')}
            className="bg-secondary-500 hover:bg-secondary-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-md transition-colors whitespace-nowrap shadow-sm ml-auto sm:ml-4"
          >
            Announcements
          </button>


        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4 relative">
          {/* Logo Space */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/KYUCSA LOGO.png"
              alt="KYUCSA Logo"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback placeholder */}
            <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
              <span className="text-xs text-gray-500 font-medium">LOGO</span>
            </div>
          </div>

          {/* Desktop Navigation - Right Aligned */}
          <nav className="hidden xl:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 flex items-center gap-1 ${['leadership', 'dean', 'hod', 'patron'].includes(currentPage)
                        ? 'text-primary-500'
                        : 'text-gray-700 hover:text-primary-500'
                        }`}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-[100]">
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavClick(subItem.id)}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary-500 ${currentPage === subItem.id ? 'text-primary-500 bg-gray-50' : 'text-gray-700'}`}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 ${currentPage === item.id
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                      }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-3 flex-1 ml-4 justify-end">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.subItems ? (
                  <button
                    className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 flex items-center gap-1 ${['leadership', 'dean', 'hod', 'patron'].includes(currentPage)
                      ? 'text-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                      }`}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                    {/* Simplified Tablet Dropdown */}
                    <div className="absolute left-0 top-full w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-[100]">
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <div
                            key={subItem.id}
                            onClick={(e) => { e.stopPropagation(); handleNavClick(subItem.id); }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary-500 ${currentPage === subItem.id ? 'text-primary-500 bg-gray-50' : 'text-gray-700'}`}
                          >
                            {subItem.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 ${currentPage === item.id
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                      }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>



          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <div className="font-medium py-3 px-4 text-gray-900 bg-gray-50 rounded-md">
                        {item.name}
                      </div>
                      <div className="pl-6 space-y-1">
                        {item.subItems.map(subItem => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavClick(subItem.id)}
                            className={`block w-full text-left py-2 px-4 rounded-md text-sm ${currentPage === subItem.id
                              ? 'text-primary-500 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                              }`}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left font-medium py-3 px-4 rounded-md transition-colors duration-200 ${currentPage === item.id
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                        }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;