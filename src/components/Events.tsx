import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Play } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  type SessionOrEvent = {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    attendees: number;
    maxAttendees: number;
    category: string;
    flyer: string;
    instructor?: string; // Optional for events
  };
  
  const sessions: SessionOrEvent[] = [
    {
      id: 1,
      title: 'React Development Workshop',
      date: '2024-03-20',
      time: '02:00 PM',
      location: 'Lab 301',
      description: 'Comprehensive hands-on workshop covering React fundamentals, hooks, and state management.',
      attendees: 45,
      maxAttendees: 60,
      category: 'Workshop',
      flyer: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'David Ssemakula'
    },
    {
      id: 2,
      title: 'Python for Data Science Session',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'Computer Lab 2',
      description: 'Learn Python programming specifically for data science applications and analytics.',
      attendees: 38,
      maxAttendees: 50,
      category: 'Training',
      flyer: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'Sarah Nakato'
    },
    {
      id: 3,
      title: 'Mobile App Development with Flutter',
      date: '2024-04-02',
      time: '09:00 AM',
      location: 'Main Lab',
      description: 'Build cross-platform mobile applications using Flutter framework.',
      attendees: 52,
      maxAttendees: 70,
      category: 'Workshop',
      flyer: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'Grace Namusoke'
    },
    {
      id: 4,
      title: 'AI & Machine Learning Fundamentals',
      date: '2024-04-08',
      time: '02:00 PM',
      location: 'Auditorium',
      description: 'Introduction to artificial intelligence and machine learning concepts.',
      attendees: 67,
      maxAttendees: 80,
      category: 'Seminar',
      flyer: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'Alex Mukwaya'
    },
    {
      id: 5,
      title: 'Cybersecurity Best Practices',
      date: '2024-04-15',
      time: '11:00 AM',
      location: 'Lab 201',
      description: 'Learn essential security practices every developer should know.',
      attendees: 41,
      maxAttendees: 55,
      category: 'Training',
      flyer: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'Maria Nassali'
    },
    {
      id: 6,
      title: 'Database Design Workshop',
      date: '2024-04-22',
      time: '01:00 PM',
      location: 'Lab 401',
      description: 'Master database design principles and SQL query optimization.',
      attendees: 33,
      maxAttendees: 45,
      category: 'Workshop',
      flyer: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructor: 'Peter Kiggundu'
    }
  ];
  
  const events: SessionOrEvent[] = [
    {
      id: 7,
      title: 'Annual Tech Conference 2024',
      date: '2024-05-15',
      time: '09:00 AM',
      location: 'Main Auditorium',
      description: 'Join us for a day of inspiring talks from industry leaders, networking opportunities, and tech showcases.',
      attendees: 245,
      maxAttendees: 300,
      category: 'Conference',
      flyer: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 8,
      title: 'Hackathon 2024: Code for Good',
      date: '2024-05-22',
      time: '08:00 AM',
      location: 'Computer Lab Complex',
      description: '48-hour hackathon focused on developing solutions for social good. Form teams and build something amazing!',
      attendees: 89,
      maxAttendees: 120,
      category: 'Competition',
      flyer: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 9,
      title: 'Career Fair & Industry Networking',
      date: '2024-06-05',
      time: '10:00 AM',
      location: 'University Grounds',
      description: 'Meet potential employers, learn about internship opportunities, and network with industry professionals.',
      attendees: 156,
      maxAttendees: 200,
      category: 'Career',
      flyer: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 10,
      title: 'KYUCSA Annual General Meeting',
      date: '2024-06-12',
      time: '03:00 PM',
      location: 'Main Hall',
      description: 'Annual meeting to discuss association progress, elect new leaders, and plan for the upcoming year.',
      attendees: 78,
      maxAttendees: 100,
      category: 'Meeting',
      flyer: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const currentItems = activeTab === 'sessions' ? sessions : events;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sessions & Events
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with our latest training sessions, workshops, and community events
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'sessions'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Sessions
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'events'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Sessions
            </button>
          </div>
        </div>

        {/* Sessions/Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gray-200 overflow-hidden relative group">
                <img 
                  src={item.flyer} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                {activeTab === 'sessions' && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play className="h-6 w-6 text-primary-500 fill-current" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-secondary-100 text-secondary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                    {item.time}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                    {item.attendees} {item.maxAttendees ? `/ ${item.maxAttendees}` : ''} attendees
                  </div>
                  {activeTab === 'sessions' && item.instructor && (
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <span className="font-medium">Instructor: {item.instructor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;