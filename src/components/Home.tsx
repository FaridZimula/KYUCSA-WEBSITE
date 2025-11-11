import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, BookOpen, Trophy, Calendar } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSessionSlide, setCurrentSessionSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const sessionInterval = setInterval(() => {
      setCurrentSessionSlide((prev) => {
        // On mobile, show 2 images; on desktop, show 4 images
        const maxSlide = isMobile 
          ? Math.max(0, sessionImages.length - 2)
          : Math.max(0, sessionImages.length - 4);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(sessionInterval);
  }, [sessionImages.length, isMobile]);

  const fullMessage = `Welcome to KYUCSA, where innovation meets opportunity. As your president, I'm excited to 
  lead an organization that has consistently championed academic excellence and professional 
  development in computing.

  This year, we're committed to expanding our reach through enhanced digital resources, 
  industry partnerships, and cutting-edge workshops that prepare you for the evolving 
  tech landscape.

  Together, we're not just building careers – we're shaping the future of technology 
  in Uganda and beyond. Join us in this exciting journey of growth, learning, and innovation.

  Our vision extends beyond the classroom walls. We believe in creating a community where every 
  computing student can thrive, regardless of their background or current skill level. Through 
  our comprehensive programs, mentorship opportunities, and industry connections, we're building 
  bridges between academic theory and real-world application.

  This semester, we're launching several new initiatives including our AI/ML research group, 
  startup incubation program, and expanded internship placement services. We're also strengthening 
  our partnerships with leading tech companies to provide more opportunities for our members.

  I encourage every computing student to actively participate in KYUCSA activities. Whether you're 
  interested in software development, cybersecurity, data science, or any other computing field, 
  we have resources and opportunities tailored for you.

  Let's make this academic year our most impactful yet. Together, we'll continue to elevate the 
  standard of computing education at Kyambogo University and prepare ourselves for leadership 
  roles in the global tech industry.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Slideshow */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden min-h-screen">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentSlide ? 'opacity-10' : 'opacity-0'
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
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome to
                <span className="block text-secondary-500">KYUCSA</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                Kyambogo University Computing Students Association - Your gateway to academic excellence, 
                collaborative learning, and professional growth in the world of computing.
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
              <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20">
                <Users className="h-6 lg:h-8 w-6 lg:w-8 text-secondary-500 mb-4" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Active Community</h3>
                <p className="text-sm lg:text-base text-blue-100">Connect with fellow computing students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20">
                <BookOpen className="h-6 lg:h-8 w-6 lg:w-8 text-secondary-500 mb-4" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Study Resources</h3>
                <p className="text-sm lg:text-base text-blue-100">Access academic resources and question banks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20">
                <Trophy className="h-6 lg:h-8 w-6 lg:w-8 text-secondary-500 mb-4" />
                <h3 className="text-base lg:text-lg font-semibold mb-2">Student Projects</h3>
                <p className="text-sm lg:text-base text-blue-100">Showcase your amazing work</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/20">
                <Calendar className="h-6 lg:h-8 w-6 lg:w-8 text-secondary-500 mb-4" />
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

          {/* Session Images Horizontal Slideshow */}
          <div className="relative mb-8 sm:mb-12">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSessionSlide * (isMobile ? 50 : 25)}%)` 
                }}
              >
                {sessionImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/4 px-2"
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
          </div>

          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('events')}
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

          {/* Infinite Scrolling Logo Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-scroll-slow">
                {/* First set of logos */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex flex-shrink-0">
                    {[
                      { name: 'Tech Company 1', logo: '/Hostel Connect logo.jpg' },
                      { name: 'Tech Company 2', logo: '/FLAMIA LOGO.png' },
                      { name: 'Tech Company 3', logo: '/Tamu Graphics.png' },
                      { name: 'Tech Company 4', logo: '/Tamu Store Lopgo.png' },
                      { name: 'Tech Company 5', logo: '/Tamu Web Logo 2.png' },
                      { name: 'Tech Company 6', logo: '/KYU LOGO 3.png' },
                      { name: 'Tech Company 3', logo: '/1719928495036.jpeg' },
                      { name: 'Tech Company 4', logo: '/download (8).png' },
                      { name: 'Tech Company 5', logo: '/download (39).jpeg' },
                      { name: 'Tech Company 6', logo: '/Policy.jpg' },
                    ].map((partner, index) => (
                      <div
                        key={`${setIndex}-${index}`}
                        className="flex-shrink-0 mx-4 sm:mx-8 w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-28"
                      >
                        <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
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
                src="/PRESIDENT'S PHOTO.jpg" 
                alt="KYUCSA President"
                className="w-full max-w-xs mx-auto lg:max-w-sm rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:left-4 lg:transform-none bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-lg">
                <p className="font-semibold text-sm sm:text-base">H.E ZIMULA FARID</p>
                <p className="text-xs sm:text-sm">KYUCSA PRESIDENT</p>
              </div>
            </div>
            
            {/* Text Second on Mobile, First on Desktop */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-6 text-center lg:text-left">
                Message from President
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                {showFullMessage ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {fullMessage.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p>
                      Welcome to KYUCSA, where innovation meets opportunity. As your president, I'm excited to 
                      lead an organization that has consistently championed academic excellence and professional 
                      development in computing.
                    </p>
                    <p>
                      This year, we're committed to expanding our reach through enhanced digital resources, 
                      industry partnerships, and cutting-edge workshops that prepare you for the evolving 
                      tech landscape.
                    </p>
                    <p>
                      Together, we're not just building careers – we're shaping the future of technology 
                      in Uganda and beyond. Join us in this exciting journey of growth, learning, and innovation.
                    </p>
                  </>
                )}
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