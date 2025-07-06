import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Home';
import Notes from './components/Notes';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Events from './components/Events';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      case 'events':
        return <Events />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;