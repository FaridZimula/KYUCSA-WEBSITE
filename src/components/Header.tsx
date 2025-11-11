import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
    { name: 'Leadership', id: 'leadership' },
    { name: 'Sessions', id: 'sessions' },
    { name: 'Sessions & Events', id: 'events' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4 relative">
          {/* Logo Space - Ready for image replacement */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="/KYUCSA LOGO.png" 
              alt="KYUCSA Logo"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                // Fallback if logo image doesn't exist yet
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback placeholder when logo image is not available */}
            <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-xs text-gray-500 font-medium">LOGO</span>
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden xl:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 ${
                  currentPage === item.id
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Spacer (for balance) */}
          <div className="hidden xl:block flex-shrink-0"></div>

          {/* Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-3 flex-1 ml-4 overflow-x-auto">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-colors duration-200 text-sm whitespace-nowrap px-2 py-1 ${
                  currentPage === item.id
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Menu Button (Tablet and Mobile) - at extreme right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden lg:flex xl:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
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
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-medium py-3 px-4 rounded-md transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;