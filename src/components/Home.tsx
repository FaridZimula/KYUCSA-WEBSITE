import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Users, BookOpen, Trophy, Calendar } from 'lucide-react';
import { partnersManager, presidentMessageManager, Partner, PresidentMessage } from '../utils/dataManager';
import { seedPartners } from '../utils/seedPartnersData';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [presidentMessage, setPresidentMessage] = useState<PresidentMessage | null>(null);

  useEffect(() => {
    const loadData = async () => {
      let allPartners = await partnersManager.getAll();

      // Auto-seed if empty
      if (allPartners.length === 0) {
        console.log('No partners found, seeding default data...');
        await seedPartners(true);
        allPartners = await partnersManager.getAll();
      }

      setPartners(allPartners.filter(p => p.category === 'home'));

      const message = await presidentMessageManager.get();
      setPresidentMessage(message);
    };
    loadData();
  }, []);

  const sessionImages = [
    '/Home Slide 3 (1).jpg',
    '/Home Slide 3 (2).jpg',
    '/Home Slide 3 (3).jpg',
    '/Home Slide 4.jpg',
    '/Home Slide 5.jpg',
    '/Home Slide 6 (2).jpg',
    '/Home Slide 7.jpg'
  ];

  const backgroundImages = [
    '/Home Slide 3 (1).jpg',
    '/Home Slide 3 (2).jpg',
    '/Home Slide 4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Slideshow */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden min-h-screen">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${index === currentSlide ? 'opacity-10' : 'opacity-0'
                }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] lg:min-h-[60vh]">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome to
                <span className="block text-secondary-500">KYUCSA</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                Kyambogo University Computing Students Association -A student association under the School Of Computing and Information Science that unites all computing students in Kyambogo University.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setCurrentPage('notes')}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center group"
                >
                  Explore Resources
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                  Join Community
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div
                onClick={() => setCurrentPage('about')}
                className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
              >
                <Users className="h-8 lg:h-10 w-8 lg:w-10 text-secondary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Active Community</h3>
                <p className="text-sm lg:text-base text-blue-100">Connect with fellow computing students</p>
              </div>
              <div
                onClick={() => setCurrentPage('notes')}
                className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
              >
                <BookOpen className="h-8 lg:h-10 w-8 lg:w-10 text-secondary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Study Resources</h3>
                <p className="text-sm lg:text-base text-blue-100">Access academic resources and question banks</p>
              </div>
              <div
                onClick={() => setCurrentPage('projects')}
                className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
              >
                <Trophy className="h-8 lg:h-10 w-8 lg:w-10 text-secondary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Student Projects</h3>
                <p className="text-sm lg:text-base text-blue-100">Showcase your amazing work</p>
              </div>
              <div
                onClick={() => setCurrentPage('sessions')}
                className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
              >
                <Calendar className="h-8 lg:h-10 w-8 lg:w-10 text-secondary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Events & Sessions</h3>
                <p className="text-sm lg:text-base text-blue-100">Stay updated with activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Sessions Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              JOIN OUR SESSIONS
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of our interactive learning sessions, workshops, and tech talks
            </p>
          </div>

          {/* Session Images Horizontal Scroll */}
          <div className="relative mb-8 sm:mb-12 group">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {sessionImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/3 px-2 snap-center"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`Session ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentPage('sessions')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-colors duration-200"
            >
              View All Our Sessions
            </button>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-12 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading technology companies and organizations
            </p>
          </div>

          {/* Partners Carousel */}
          <div className="relative group">
            {partners.length > 0 ? (
              <div
                id="partners-carousel"
                className="flex overflow-x-auto space-x-8 pb-8 pt-4 px-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
              >
                {partners.map((partner, index) => (
                  <div
                    key={partner.id || index}
                    className="flex-shrink-0 w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-28 snap-center"
                  >
                    <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center border border-gray-200 hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Our partners will be displayed here.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Message from President Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image First on Mobile, Second on Desktop */}
            <div className="relative order-1 lg:order-2">
              <img
                src={presidentMessage?.image || "/PRESIDENT'S PHOTO.jpg"}
                alt="KYUCSA President"
                className="w-full max-w-xs mx-auto lg:max-w-sm rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:left-4 lg:transform-none bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-lg">
                <p className="font-semibold text-sm sm:text-base">{presidentMessage?.name || 'H.E. ZIMULA FARID'}</p>
                <p className="text-xs sm:text-sm">{presidentMessage?.title || 'KYUCSA PRESIDENT'}</p>
              </div>
            </div>

            {/* Text Second on Mobile, First on Desktop */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-6 text-center lg:text-left">
                Message from President
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                <div className={`space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base relative ${showFullMessage ? '' : 'max-h-[450px] overflow-hidden'}`}>
                  {(presidentMessage?.message || '').split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph.trim()}</p>
                  ))}

                  {!showFullMessage && (
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-center lg:justify-start">
                <button
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  {showFullMessage ? 'Show Less' : 'Read Full Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;