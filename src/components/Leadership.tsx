import React from 'react';
import { Mail, Award } from 'lucide-react';

const Leadership = () => {
  const president = {
    id: 1,
    name: 'Alex Mukwaya',
    position: 'President',
    year: 'Year 4',
    course: 'Computer Science',
    bio: 'Passionate about technology and student welfare. Leading KYUCSA with a vision for innovation and excellence in computing education.',
    email: 'president@kyucsa.org',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    achievements: ['Best Leadership Award 2023', 'Dean\'s List Student', 'Google Developer Student Club Lead']
  };

  const otherExecutives = [
    {
      id: 2,
      name: 'Grace Namusoke',
      position: 'Vice President',
      year: 'Year 3',
      course: 'Information Technology',
      bio: 'Dedicated to bridging the gap between students and administration while promoting academic excellence.',
      email: 'vicepresident@kyucsa.org',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Outstanding Student Leader 2023', 'Microsoft Student Ambassador']
    },
    {
      id: 3,
      name: 'David Ssemakula',
      position: 'Secretary General',
      year: 'Year 3',
      course: 'Software Engineering',
      bio: 'Ensuring effective communication and documentation of all association activities.',
      email: 'secretary@kyucsa.org',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Best Documentation Award', 'AWS Certified Developer']
    },
    {
      id: 4,
      name: 'Sarah Nakimbugwe',
      position: 'Treasurer',
      year: 'Year 4',
      course: 'Information Systems',
      bio: 'Managing association finances with transparency and optimal resource allocation.',
      email: 'treasurer@kyucsa.org',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Financial Excellence Award', 'Certified Public Accountant']
    },
    {
      id: 5,
      name: 'Robert Kigozi',
      position: 'Technical Lead',
      year: 'Year 4',
      course: 'Computer Engineering',
      bio: 'Leading technical initiatives and digital infrastructure development.',
      email: 'techleader@kyucsa.org',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
    },
    // Adding 21 more members to reach 26 total (including president)
    ...Array.from({ length: 21 }, (_, i) => ({
      id: i + 6,
      name: `Member ${i + 1}`,
      position: `Executive Member`,
      year: `Year ${Math.floor(Math.random() * 4) + 1}`,
      course: ['Computer Science', 'Information Technology', 'Software Engineering', 'Computer Engineering'][Math.floor(Math.random() * 4)],
      bio: 'Dedicated member contributing to KYUCSA\'s mission of academic excellence and professional development.',
      email: `member${i + 1}@kyucsa.org`,
      image: `https://images.pexels.com/photos/${[1040880, 1181690, 2379004, 1239291, 2182970][Math.floor(Math.random() * 5)]}/pexels-photo-${[1040880, 1181690, 2379004, 1239291, 2182970][Math.floor(Math.random() * 5)]}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      achievements: ['Active Contributor', 'Team Player']
    }))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our Leadership Team
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Dedicated student leaders working tirelessly to serve the computing community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* President Section - Larger and Prominent */}
        <div className="mb-12 sm:mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border-2 border-primary-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
                <div className="aspect-square bg-gray-200 overflow-hidden rounded-xl">
                  <img 
                    src={president.image} 
                    alt={president.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="mb-4 sm:mb-6 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{president.name}</h3>
                    <p className="text-xl sm:text-2xl font-semibold text-primary-500 mb-2">{president.position}</p>
                    <p className="text-base sm:text-lg text-gray-600">{president.year} • {president.course}</p>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center md:text-left">{president.bio}</p>
                  
                  {/* Achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center md:justify-start">
                      <Award className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-secondary-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {president.achievements.map((achievement, index) => (
                        <p key={index} className="text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg text-center md:text-left">
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <Mail className="h-4 sm:h-5 w-4 sm:w-5 mr-3 text-primary-500 flex-shrink-0" />
                    <a href={`mailto:${president.email}`} className="hover:text-primary-500 transition-colors text-sm sm:text-base break-all">
                      {president.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Executive Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {otherExecutives.map((executive) => (
            <div key={executive.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img 
                  src={executive.image} 
                  alt={executive.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div className="p-3 sm:p-4">
                <div className="mb-3 text-center">
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1">{executive.name}</h3>
                  <p className="text-xs sm:text-md font-semibold text-primary-500 mb-1 line-clamp-1">{executive.position}</p>
                  <p className="text-xs text-gray-600">{executive.year} • {executive.course}</p>
                </div>
                
                <p className="text-gray-700 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-3 text-center">{executive.bio}</p>
                
                {/* Achievements */}
                <div className="mb-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <Award className="h-3 w-3 mr-1 text-secondary-500" />
                    Achievements
                  </h4>
                  <div className="space-y-1">
                    {executive.achievements.slice(0, 2).map((achievement, index) => (
                      <p key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded text-center line-clamp-1">
                        {achievement}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600">
                  <Mail className="h-3 sm:h-4 w-3 sm:w-4 mr-2 text-primary-500 flex-shrink-0" />
                  <a href={`mailto:${executive.email}`} className="hover:text-primary-500 transition-colors truncate">
                    {executive.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;