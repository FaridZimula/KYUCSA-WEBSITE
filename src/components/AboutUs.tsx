import React from 'react';
import { Users, Target, Handshake, Calendar, Award, BookOpen, Briefcase, Globe } from 'lucide-react';

interface AboutUsProps {
  setCurrentPage: (page: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ setCurrentPage }) => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Access to comprehensive study materials, notes, and question banks for all computing courses.',
      color: 'blue' // Blue theme
    },
    {
      icon: Users,
      title: 'Networking Opportunities',
      description: 'Connect with fellow students, alumni, and industry professionals in the computing field.',
      color: 'orange' // Orange theme
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Internship placements, job opportunities, and career guidance from industry experts.',
      color: 'blue' // Blue theme
    },
    {
      icon: Award,
      title: 'Skill Enhancement',
      description: 'Workshops, seminars, and training programs to enhance your technical and soft skills.',
      color: 'orange' // Orange theme
    },
    {
      icon: Globe,
      title: 'Industry Exposure',
      description: 'Regular tech talks, company visits, and exposure to latest industry trends and technologies.',
      color: 'blue' // Blue theme
    },
    {
      icon: Target,
      title: 'Leadership Development',
      description: 'Opportunities to take on leadership roles and develop management and organizational skills.',
      color: 'orange' // Orange theme
    }
  ];

  const partners = [
    {
      name: 'Microsoft',
      logo: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Technology partnership for student development programs'
    },
    {
      name: 'Google',
      logo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Developer student club and cloud computing resources'
    },
    {
      name: 'Amazon Web Services',
      logo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Cloud computing training and certification programs'
    },
    {
      name: 'IBM',
      logo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'AI and machine learning educational resources'
    },
    {
      name: 'Oracle',
      logo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Database management and enterprise software training'
    },
    {
      name: 'Cisco',
      logo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Networking and cybersecurity certification programs'
    }
  ];

  const workPlan = [
    {
      quarter: 'Q1 2024',
      title: 'Foundation & Orientation',
      activities: [
        'New student orientation and KYUCSA introduction',
        'Leadership team establishment and role assignments',
        'Academic resource compilation and organization',
        'Partnership agreements with industry leaders'
      ],
      color: 'blue'
    },
    {
      quarter: 'Q2 2024',
      title: 'Skill Development & Training',
      activities: [
        'Monthly technical workshops and seminars',
        'Career development and soft skills training',
        'Industry mentorship program launch',
        'Student project showcase preparation'
      ],
      color: 'orange'
    },
    {
      quarter: 'Q3 2024',
      title: 'Innovation & Competition',
      activities: [
        'Annual hackathon and coding competitions',
        'Research project presentations',
        'Internship placement drive',
        'Alumni networking events'
      ],
      color: 'blue'
    },
    {
      quarter: 'Q4 2024',
      title: 'Growth & Expansion',
      activities: [
        'Year-end tech conference and awards',
        'Strategic planning for next academic year',
        'Partnership expansion and new collaborations',
        'Impact assessment and feedback collection'
      ],
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About KYUCSA
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Building tomorrow's leaders through service and fellowship
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
          <div className="bg-primary-500 text-white p-6 sm:p-8 rounded-xl shadow-sm">
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
          
          <div className="bg-secondary-500 text-white p-6 sm:p-8 rounded-xl shadow-sm">
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
              Benefits of Joining KYUCSA
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of being part of our dynamic computing community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const isBlue = benefit.color === 'blue';
              return (
                <div key={index} className="flip-card h-64">
                  <div className="flip-card-inner">
                    {/* Front of card */}
                    <div className={`flip-card-front ${isBlue ? 'bg-primary-500' : 'bg-secondary-500'} text-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center`}>
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg mb-4">
                        <IconComponent className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{benefit.title}</h3>
                    </div>
                    
                    {/* Back of card */}
                    <div className={`flip-card-back ${isBlue ? 'bg-primary-600' : 'bg-secondary-600'} text-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-center`}>
                      <p className="text-sm sm:text-base leading-relaxed text-center">{benefit.description}</p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partners.map((partner, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className="flip-card h-48">
                  <div className="flip-card-inner">
                    {/* Front of card - White background */}
                    <div className="flip-card-front bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center border border-gray-200">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg object-cover mb-4"
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

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {workPlan.map((quarter, index) => {
              const isBlue = quarter.color === 'blue';
              return (
                <div key={index} className={`${isBlue ? 'bg-primary-500' : 'bg-secondary-500'} text-white p-6 sm:p-8 rounded-xl shadow-lg h-80`}>
                  <div className="flex items-center mb-6">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                      <Calendar className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">{quarter.quarter}</h3>
                      <p className="text-base sm:text-lg font-medium">{quarter.title}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-4">Key Activities</h4>
                  <ul className="space-y-3">
                    {quarter.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start">
                        <div className="bg-white w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-500 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white">
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