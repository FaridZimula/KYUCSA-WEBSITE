import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Home';
import Notes from './components/Notes';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Events from './components/Events';
import Sessions from './components/Sessions';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import Chatbot from './components/Chatbot';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Sync with URL hash for direct navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'about', 'notes', 'projects', 'leadership', 'sessions', 'events', 'contact', 'admin'].includes(hash)) {
      setCurrentPage(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash && ['home', 'about', 'notes', 'projects', 'leadership', 'sessions', 'events', 'contact', 'admin'].includes(newHash)) {
        setCurrentPage(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when page changes
  useEffect(() => {
    if (currentPage !== 'home') {
      window.location.hash = currentPage;
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutUs setCurrentPage={setCurrentPage} />;
      case 'notes':
        return <Notes setCurrentPage={setCurrentPage} />;
      case 'projects':
        return <Projects />;
      case 'leadership':
        return <Leadership />;
      case 'sessions':
        return <Sessions />;
      case 'events':
        return <Events />;
      case 'contact':
        return <ContactUs />;
      case 'admin':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  // Admin dashboard has its own layout, so don't show header/footer for admin
  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminPage && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className="min-h-screen">
        {renderPage()}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <Chatbot />}
    </div>
  );
}

export default App;