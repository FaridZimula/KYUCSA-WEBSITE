import { useState, useEffect } from 'react';
import { Mail, Award, Linkedin } from 'lucide-react';
import { leadershipManager, LeadershipMember } from '../utils/dataManager';

const Leadership = () => {
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [availableYears, setAvailableYears] = useState<string[]>(['2025-2026', '2024-2025']);
  const [president, setPresident] = useState<LeadershipMember | null>(null);
  const [executives, setExecutives] = useState<LeadershipMember[]>([]);

  useEffect(() => {
    loadLeadership(selectedYear);
  }, [selectedYear]);

  const loadLeadership = async (year: string) => {
    const allData = await leadershipManager.getAll();

    // Ensure we have years in the available list if they exist in storage
    const storedYears = Object.keys(allData);
    if (storedYears.length > 0) {
      const uniqueYears = Array.from(new Set([...availableYears, ...storedYears]))
        .filter(year => year !== '2023-2024' && !year.startsWith('Year'))
        .sort()
        .reverse();
      if (JSON.stringify(uniqueYears) !== JSON.stringify(availableYears)) {
        setAvailableYears(uniqueYears);
      }
    }

    const data = allData[year] || { president: null, executives: [] };

    // Initialize with default data if empty and it's the current year
    if (!data.president && year === '2025-2026') {

      const defaultPresident: LeadershipMember = {
        id: 1,
        name: 'H.E ZIMULA FARID',
        position: 'President',
        year: 'Year 3',
        course: 'Bachelor of Information Technology And Computing (BITC)',
        bio: 'A rotaract, cricket player and a student leader who is passionate about technology and entrepreneurship.',
        email: 'president@kyucsa.org',
        image: '/PRESIDENT\'S PHOTO.jpg',
        achievements: ['React Front End Developer', 'Graphics, UI/UX Designer', 'Digital Marketeer']
      };

      const otherExecutives = [
        {
          id: 2,
          name: 'H.E ATUKUNDA BLESSING',
          position: 'Vice President',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Dedicated to bridging the gap between students and administration while promoting academic excellence.',
          email: 'vicepresident@kyucsa.org',
          image: 'https://images.pexels.com/photos/1239291/pexels-photo-123=400',
          achievements: ['Outstanding Student Leader 2023', 'Microsoft Student Ambassador']
        },
        {
          id: 3,
          name: 'Hon. Akampuraa Kennedy',
          position: 'Speaker',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Ensuring effective communication and documentation of all association activities.',
          email: 'secretary@kyucsa.org',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182&w=400',
          achievements: ['Best Documentation Award', 'AWS Certified Developer']
        },
        {
          id: 4,
          name: 'ALOHA GLORIA',
          position: 'Vice Speaker',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Managing association finances with transparency and optimal resource allocation.',
          email: 'treasurer@kyucsa.org',
          image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpgb&w=400',
          achievements: ['Financial Excellence Award', 'Certified Public Accountant']
        },
        {
          id: 5,
          name: 'Nantumbwe Harriet',
          position: 'Treasurer',
          year: 'Year 4',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-237rgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'AKOL HOPE',
          position: 'General Secretary',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005rgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'BAMWESIGYE EVANS',
          position: 'Organising Secretary',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeggb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'WANYAMA SWALLE',
          position: 'Publicity Secretary',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photoinysrgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'AHURIRA CHRISTIAN',
          position: 'Sports Secretary',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005srgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'NAMUTEBI EDITH',
          position: 'Graphics Lead',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpegb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'OMOLO PASIKALI',
          position: 'ASSISTANT GRAPHICS LEAD',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379srgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'WAMBOGO HASSAN',
          position: 'WEB LEAD',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-23b&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'WANDERA JONAH',
          position: 'Assistant Web Lead',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-phot&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'BANGOLE ALVIN',
          position: 'Android Lead',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexelsgb&w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'MUWANGA ENOCK',
          position: 'Networking Lead',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-p400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'KYESWA SHAFIK',
          position: 'Cyber Security Lead',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-23ew=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'GITTA IBRAHIM',
          position: 'Digital Marketing Lead',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379ress&cs=0',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'GUMUSIRIZA JOEL',
          position: 'Projects Lead',
          year: 'Year 2',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'A researcher, passionate about development and innovation in the emerging science technologies.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2w=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'BAGUMA JESSY',
          position: 'Assistant Projects Lead',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'IAN WANYAMA',
          position: 'Presidential Advisor',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo=400',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'TUMWEBAZE IMMACULATE',
          position: 'BIS Class Representative',
          year: 'Year 3',
          course: 'Bachelor of Information Systems(BIS)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-20',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
        {
          id: 5,
          name: 'ERICK',
          position: 'Presidential Advisor',
          year: 'Year 3',
          course: 'Bachelor of Information Technology And Computing (BITC)',
          bio: 'Leading technical initiatives and digital infrastructure development.',
          email: 'techleader@kyucsa.org',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005',
          achievements: ['Innovation Award Winner', 'Full Stack Developer Certified']
        },
      ];

      setPresident(defaultPresident);
      setExecutives(otherExecutives);

      // Save default data to storage
      await leadershipManager.setPresident(defaultPresident);
      for (const exec of otherExecutives) {
        await leadershipManager.addExecutive(exec);
      }
    } else if (!data.president && year === '2024-2025') {
      // Sample data for previous year to show structure
      const prevPresident: LeadershipMember = {
        id: 101,
        name: 'PREVIOUS PRESIDENT',
        position: 'President',
        year: 'Year 4',
        course: 'Bachelor of Computer Science',
        bio: 'Led the association with distinction during the 2024-2025 tenure.',
        email: 'president.prev@kyucsa.org',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        achievements: ['Community Growth', 'Partnerships Established']
      };

      const prevExecutives: LeadershipMember[] = [
        {
          id: 102,
          name: 'PREVIOUS VICE PRESIDENT',
          position: 'Vice President',
          year: 'Year 3',
          course: 'Bachelor of Information Systems',
          bio: 'Supported the president and managed internal affairs.',
          email: 'vp.prev@kyucsa.org',
          image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          achievements: ['Student Outreach', 'Event Coordination']
        }
      ];

      setPresident(prevPresident);
      setExecutives(prevExecutives);

      // Save to storage
      await leadershipManager.setPresident(prevPresident);
      for (const exec of prevExecutives) {
        await leadershipManager.addExecutive(exec);
      }
    } else {
      setPresident(data.president);
      setExecutives(data.executives);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img
            src="/Home Slide 5.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our Leadership Team
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Dedicated student leaders working tirelessly to serve the computing community
          </p>

          {/* Year Selection Tabs - Added */}
          <div className="inline-flex bg-primary-600/50 p-1 rounded-xl backdrop-blur-sm">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${selectedYear === year
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-primary-500/50'
                  }`}
              >
                Cabinet of {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* President Section - Larger and Prominent */}
        {president && (
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

                    {/* Achievements */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center md:justify-start">
                        <Award className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-secondary-500" />
                        Specialisations
                      </h4>
                      <div className="space-y-2">
                        {president.achievements.map((achievement: string, index: number) => (
                          <p key={index} className="text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg text-center md:text-left">
                            {achievement}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      {president.linkedin && (
                        <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#0077b5] transition-colors">
                          <Linkedin className="h-5 sm:h-6 w-5 sm:w-6" />
                        </a>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-5 sm:h-6 w-5 sm:w-6 mr-3 text-primary-500 flex-shrink-0" />
                        <a href={`mailto:${president.email}`} className="hover:text-primary-500 transition-colors text-sm sm:text-base break-all">
                          {president.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Executive Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {executives.map((executive: LeadershipMember) => (
            <div key={executive.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 mx-auto w-full max-w-[464px] h-[700px] sm:w-auto sm:max-w-none sm:h-auto flex flex-col">
              <div className="aspect-square bg-gray-200 overflow-hidden shrink-0 h-[464px] sm:h-auto">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="mb-3 text-center">
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1">{executive.name}</h3>
                  <p className="text-xs sm:text-md font-semibold text-primary-500 mb-1 line-clamp-1">{executive.position}</p>
                  <p className="text-xs text-gray-600">{executive.year} • {executive.course}</p>
                </div>

                {/* Achievements */}
                <div className="mb-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <Award className="h-3 w-3 mr-1 text-secondary-500" />
                    Specialisations
                  </h4>
                  <div className="space-y-1">
                    {executive.achievements.slice(0, 2).map((achievement: string, index: number) => (
                      <p key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded text-center line-clamp-1">
                        {achievement}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="flex items-center justify-center gap-3 mt-auto">
                  {executive.linkedin && (
                    <a href={executive.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#0077b5] transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Mail className="h-3 sm:h-4 w-3 sm:w-4 mr-2 text-primary-500 flex-shrink-0" />
                    <a href={`mailto:${executive.email}`} className="hover:text-primary-500 transition-colors truncate">
                      {executive.email}
                    </a>
                  </div>
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