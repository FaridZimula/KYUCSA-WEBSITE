import React, { useState, useEffect } from 'react';
import { Users, Target, Award, BookOpen, Briefcase, Globe, FileDown } from 'lucide-react';
import { partnersManager, settingsManager, Partner } from '../utils/dataManager';

interface AboutUsProps {
  setCurrentPage: (page: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ setCurrentPage }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [workPlanUrl, setWorkPlanUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load corporate partners and settings
    const loadData = async () => {
      const allPartners = await partnersManager.getAll();
      const corporatePartners = allPartners.filter(p => p.category === 'corporate');
      if (corporatePartners.length > 0) {
        setPartners(corporatePartners);
      }

      const url = await settingsManager.get('work_plan_url');
      if (url) setWorkPlanUrl(url);
    };

    loadData();
  }, []);

  const benefits = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Access to comprehensive study materials, academic resources, and question banks for all computing courses.',
      image: 'public/Academic excellence.jpg',
      color: 'blue' // Blue theme
    },
    {
      icon: Users,
      title: 'Networking Opportunities',
      description: 'Connect with fellow students, alumni, and industry professionals in the computing field.',
      image: '/Networking.jpg',
      color: 'orange' // Orange theme
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Internship placements, job opportunities, and career guidance from industry experts.',
      image: '/Career Development.jpg',
      color: 'blue' // Blue theme
    },
    {
      icon: Award,
      title: 'Skill Enhancement',
      description: 'Workshops, seminars, and training programs to enhance your technical and soft skills.',
      image: '/Skill enhancement.jpg',
      color: 'orange' // Orange theme
    },
    {
      icon: Globe,
      title: 'Industry Exposure',
      description: 'Regular tech talks, company visits, and exposure to latest industry trends and technologies.',
      image: '/Global Exposure.jpg',
      color: 'blue' // Blue theme
    },
    {
      icon: Target,
      title: 'Leadership Development',
      description: 'Opportunities to take on leadership roles and develop management and organizational skills.',
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'orange' // Orange theme
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img
            src="/Home Slide 4.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About KYUCSA
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Shaping tomorrow's computing professionals through our weekly and leadership activities
          </p>
          <p className="text-base sm:text-lg text-blue-200 mt-2">
            Empowering computing students at Kyambogo University
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        {/* About KYUCSA Section */}
        <div className="text-center mb-16">
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Kyambogo University Computing Students Association (KYUCSA) is a vibrant student organization
            dedicated to fostering academic excellence, professional development, and community building among
            computing students at Kyambogo University.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-primary-500 text-white p-6 sm:p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg w-fit mb-6">
              <Target className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              To empower computing students through comprehensive academic support, professional development
              opportunities, and industry connections that prepare them for successful careers in technology
              and innovation.
            </p>
          </div>

          <div className="bg-secondary-500 text-white p-6 sm:p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg w-fit mb-6">
              <Globe className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
              To be the leading computing students association in Uganda, recognized for producing
              world-class technology professionals who drive innovation and contribute meaningfully
              to the global digital economy.
            </p>
          </div>
        </div>

        {/* Benefits of Joining KYUCSA - WITH FLIPPING EFFECT */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Offer as KYUCSA
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of being part of our dynamic computing community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const isBlue = benefit.color === 'blue';
              return (
                <div key={index} className="flip-card h-80">
                  <div className="flip-card-inner">
                    {/* Front of card */}
                    <div className="flip-card-front text-white rounded-xl shadow-lg relative overflow-hidden">
                      {/* Full Height Image */}
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Gradient Overlay: Transparent top -> Solid Color bottom */}
                      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-90% ${isBlue ? 'to-primary-600' : 'to-secondary-600'}`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60`}></div>

                      {/* Content positioned at the bottom */}
                      <div className="relative z-10 h-full flex flex-col justify-end items-center p-6 pb-8">
                        <h3 className="text-xl font-bold text-center drop-shadow-md">{benefit.title}</h3>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className={`flip-card-back ${isBlue ? 'bg-primary-600' : 'bg-secondary-600'} text-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center`}>
                      <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                      <p className="text-base leading-relaxed text-center">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Corporate Partners
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with industry leaders to provide our members with the best opportunities
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 gap-6 sm:gap-8">
            {partners.map((partner, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className="flip-card h-48 min-w-[300px] flex-shrink-0 snap-center">
                  <div className="flip-card-inner">
                    {/* Front of card - White background */}
                    <div className="flip-card-front bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center border border-gray-200">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-24 object-contain mb-4"
                      />
                      <h3 className={`text-lg sm:text-xl font-semibold text-center ${isBlue ? 'text-primary-500' : 'text-secondary-500'}`}>
                        {partner.name}
                      </h3>
                    </div>

                    {/* Back of card - Theme colors */}
                    <div className={`flip-card-back ${isBlue ? 'bg-primary-500' : 'bg-secondary-500'} text-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-center`}>
                      <p className="text-sm sm:text-base leading-relaxed text-center">{partner.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Work Plan - NO FLIPPING EFFECT */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Work Plan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic roadmap for achieving our goals and serving our community
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href={workPlanUrl || "/KYUCSA_WORK_PLAN.pdf"}
              download="KYUCSA_WORK_PLAN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FileDown className="h-6 w-6" />
              Download Work Plan (PDF)
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-500 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white relative overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Home Slide 3 (1).jpg"
              alt="Background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Become part of KYUCSA today and unlock your potential in the world of computing and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Join KYUCSA Now
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;