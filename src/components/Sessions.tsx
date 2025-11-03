import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, BookOpen, Video } from 'lucide-react';
import { eventsManager, sessionsManager, Event, Session } from '../utils/dataManager';

const Sessions: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sessions' | 'events'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const eventsData = eventsManager.getAll();
    const sessionsData = sessionsManager.getAll();
    setEvents(eventsData);
    setSessions(sessionsData);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredItems = () => {
    if (activeTab === 'sessions') {
      return { sessions, events: [] };
    } else if (activeTab === 'events') {
      return { sessions: [], events };
    } else {
      return { sessions, events };
    }
  };

  const filteredData = getFilteredItems();

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
        <div className="mb-8 flex justify-center">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'sessions'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              Sessions
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {/* Content */}
        {(filteredData.sessions.length === 0 && filteredData.events.length === 0) ? (
          <div className="text-center py-12">
            <Calendar className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No {activeTab === 'all' ? 'sessions or events' : activeTab === 'sessions' ? 'sessions' : 'events'} found
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Check back soon for upcoming activities.</p>
          </div>
        ) : (
          <>
            {/* Sessions Section */}
            {filteredData.sessions.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Training Sessions</h2>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {filteredData.sessions.length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredData.sessions.map((session) => (
                    <div key={`session-${session.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      {session.flyer && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img 
                            src={session.flyer} 
                            alt={session.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}
                      
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-secondary-100 text-secondary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {session.category}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Session
                          </span>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{session.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{session.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {formatDate(session.date)}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {session.time}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {session.location}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {session.attendees} / {session.maxAttendees} attendees
                          </div>
                          {session.instructor && (
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <span className="font-medium">Instructor: {session.instructor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Section */}
            {filteredData.events.length > 0 && (
              <div className={filteredData.sessions.length > 0 ? 'mt-12' : ''}>
                <div className="flex items-center mb-6">
                  <Video className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Community Events</h2>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {filteredData.events.length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredData.events.map((event) => (
                    <div key={`event-${event.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      {event.flyer && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img 
                            src={event.flyer} 
                            alt={event.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}
                      
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-secondary-100 text-secondary-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Event
                          </span>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {event.attendees} / {event.maxAttendees} attendees
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sessions;
