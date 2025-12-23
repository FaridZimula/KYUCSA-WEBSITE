import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Home';
import Notes from './components/Notes';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import LeadershipMessage from './components/LeadershipMessage';
import Events from './components/Events';
import Sessions from './components/Sessions';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/admin/Login';
import Chatbot from './components/Chatbot';
import Announcements from './components/Announcements';
import FloatingAnnouncement from './components/FloatingAnnouncement';
import { authManager } from './utils/dataManager';
import GeminiTest from './components/GeminiTest';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // Sync with URL hash for direct navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'about', 'notes', 'projects', 'leadership', 'dean', 'hod', 'patron', 'sessions', 'events', 'contact', 'admin', 'login', 'gemini-test'].includes(hash)) {
      setCurrentPage(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash && ['home', 'about', 'notes', 'projects', 'leadership', 'dean', 'hod', 'patron', 'sessions', 'events', 'contact', 'admin', 'login', 'gemini-test'].includes(newHash)) {
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
      case 'dean':
        return (
          <LeadershipMessage
            role="dean"
            title="Message from the Dean"
            defaultName="Dr. John Doe"
            defaultImage="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800"
            defaultMessage={`Welcome to the School of Computing and Information Science. It gives me great pleasure to welcome you to our vibrant community of innovators, problem-solvers, and future tech leaders. Our school is dedicated to providing you with a world-class education that blends theoretical foundations with practical, hands-on experience.\nIn today's rapidly evolving digital landscape, the skills you acquire here will be your passport to a global career. We have curated a curriculum that is responsive to industry needs, covering cutting-edge topics such as Artificial Intelligence, Data Science, Cybersecurity, and Software Engineering. Our faculty members are not just teachers but mentors who are deeply invested in your success.\nI encourage you to look beyond the classroom. Engage in our hackathons, join our student clubs, and participate in research projects. These extra-curricular activities are where you will refine your soft skills, build your professional network, and discover your true passions. Remember, university life is as much about personal growth as it is about academic achievement.\nAs you embark on this exciting journey, know that my door is always open. We are here to support you every step of the way. I look forward to witnessing your achievements and seeing the mark you will leave on the world of technology.`}
          />
        );
      case 'hod':
        return (
          <LeadershipMessage
            role="hod"
            title="Message from the H.O.D"
            defaultName="Dr. Jane Smith"
            defaultImage="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
            defaultMessage={`As the Head of Department, I am thrilled to welcome both new and returning students to another promising academic year. Our department stands at the forefront of technological innovation, and we are proud to offer programs that challenge your intellect and spark your creativity.\nOur primary goal is to foster an environment where curiosity is celebrated and resilience is developed. The field of computing is demanding, but it is also incredibly rewarding. We have equipped our laboratories with state-of-the-art resources to ensure you have the tools necessary to experiment, build, and innovate. Make full use of these facilities and the expertise of our technical staff.\nCollaboration is key in the tech industry. I urge you to work together, share ideas, and learn from one another. The peer network you build here will likely be the support system you rely on throughout your professional career. Do not hesitate to ask questions, challenge assumptions, and explore new ways of thinking.\nWe are committed to your academic and professional development. Let us work together to achieve excellence and drive the digital transformation of our society.`}
          />
        );
      case 'patron':
        return (
          <LeadershipMessage
            role="patron"
            title="Message from the Patron"
            defaultName="Prof. Alan Turing"
            defaultImage="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
            defaultMessage={`It is an honor to serve as the Patron of KYUCSA. This association represents the spirit of unity, innovation, and leadership that defines our student body. KYUCSA provides a unique platform for you to bridge the gap between academic learning and industry practice.\nI have watched this association grow from a small group of enthusiasts to a powerhouse of talent and creativity. The projects you undertake, the events you organize, and the community outreach you perform are a testament to your dedication and potential. You are not just students; you are the future architects of our digital world.\nI encourage every student to be an active member of KYUCSA. Take up leadership roles, volunteer for committees, and contribute your unique skills. The experiences you gain here—managing teams, organizing events, resolving conflicts—are invaluable life skills that textbooks cannot teach.\nLet us continue to uphold the values of integrity, excellence, and inclusivity. I am excited to see what we can achieve together this year. Go forth and innovate!`}
          />
        );
      case 'sessions':
        return <Sessions />;
      case 'events':
        return <Events />;
      case 'contact':
        return <ContactUs />;
      case 'announcements':
        return <Announcements />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'admin':
        if (!authManager.isAuthenticated()) {
          // Redirect to login if not authenticated
          setTimeout(() => setCurrentPage('login'), 0);
          return null;
        }
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      case 'gemini-test':
        return <GeminiTest />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  // Admin dashboard and login pages have their own layout
  const isAdminPage = currentPage === 'admin' || currentPage === 'login';

  return (
    <div className="min-h-screen bg-gray-50">
      {showSplash && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center transition-opacity duration-1000">
          <img
            src="/KYUCSA OPENING.png"
            alt="KYUCSA Splash Logo"
            className="w-64 h-auto object-contain animate-pulse"
          />
        </div>
      )}
      {!isAdminPage && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className="min-h-screen">
        {renderPage()}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingAnnouncement setCurrentPage={setCurrentPage} />}
      {!isAdminPage && <Chatbot />}
    </div>
  );
}

export default App;