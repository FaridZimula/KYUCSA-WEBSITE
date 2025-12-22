import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Video, Play, ExternalLink } from 'lucide-react';
import { eventsManager, sessionsManager, Event, Session } from '../utils/dataManager';

const Sessions: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  // Added 'past-sessions' to activeTab state
  const [activeTab, setActiveTab] = useState<'all' | 'sessions' | 'events' | 'past-sessions'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Fetch real data from Supabase
    const eventsData = await eventsManager.getAll();
    let sessionsData = await sessionsManager.getAll();

    // -- DEMO DATA INJECTION REMOVED --

    setEvents(eventsData);
    setSessions(sessionsData);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredItems = () => {
    const upcomingSessions = sessions.filter(s => !s.isPast);
    const pastSessions = sessions.filter(s => s.isPast);

    if (activeTab === 'sessions') {
      return { sessions: upcomingSessions, events: [], pastSessions: [] };
    } else if (activeTab === 'events') {
      return { sessions: [], events, pastSessions: [] };
    } else if (activeTab === 'past-sessions') {
      return { sessions: [], events: [], pastSessions };
    } else {
      // 'all' - Show Upcoming Sessions and Events. Maybe hide past sessions to avoid clutter?
      // Or show them at the bottom. Let's show upcoming stuff primarily.
      return { sessions: upcomingSessions, events, pastSessions: [] }; // Hiding Past Sessions from 'All' to emphasize the specialized tab
    }
  };

  const filteredData = getFilteredItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img
            src="/Home Slide 3 (2).jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
        <div className="mb-8 flex justify-center overflow-x-auto pb-4 sm:pb-0">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 whitespace-nowrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'all'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-primary-500'
                }`}
            >
              All Upcoming
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'sessions'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-primary-500'
                }`}
            >
              Upcoming Sessions
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'events'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-primary-500'
                }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('past-sessions')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'past-sessions'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-primary-500'
                }`}
            >
              Past Sessions & Recordings
            </button>
          </div>
        </div>

        {/* Content */}
        {(filteredData.sessions.length === 0 && filteredData.events.length === 0 && filteredData.pastSessions.length === 0) ? (
          <div className="text-center py-12">
            <Calendar className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Upcoming Sessions Section */}
            {filteredData.sessions.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {filteredData.sessions.map((session) => (
                    <div key={`session-${session.id}`} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      {session.flyer && (
                        <div className="w-full sm:w-48 lg:w-56 relative shrink-0 bg-gray-200" style={{ aspectRatio: '1280/1373' }}>
                          <img
                            src={session.flyer}
                            alt={session.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}

                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-secondary-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {session.category}
                          </span>
                          <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">
                            Upcoming
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
                <div className="flex items-center justify-center mb-6">
                  <Video className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Community Events</h2>
                  <span className="ml-3 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {filteredData.events.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {filteredData.events.map((event) => (
                    <div key={`event-${event.id}`} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      {/* Portrait Flyer on Left */}
                      {event.flyer && (
                        <div className="w-full sm:w-48 lg:w-56 h-64 sm:h-auto relative shrink-0 bg-gray-200">
                          <img
                            src={event.flyer}
                            alt={event.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}

                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-secondary-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {event.category}
                          </span>
                          <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">
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
                          {/* ... other metadata ... */}
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAST Sessions Section */}
            {filteredData.pastSessions.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-center mb-6">
                  <Video className="h-6 w-6 text-red-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Pas Sessions & Recordings</h2>
                  <span className="ml-3 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {filteredData.pastSessions.length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredData.pastSessions.map((session) => (
                    <div key={`past-session-${session.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                      {/* Thumbnail Container with Play Button Overlay */}
                      <div className="aspect-video bg-white border-b border-gray-100 relative overflow-hidden cursor-pointer"
                        onClick={() => session.youtubeLink && window.open(session.youtubeLink, '_blank')}
                      >
                        {session.thumbnail ? (
                          <img
                            src={session.thumbnail}
                            alt={session.title}
                            className="w-full h-full object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-200 hover:scale-105 transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white">
                            <Video className="h-12 w-12 text-gray-200" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-3 sm:p-4 shadow-xl transform group-hover:scale-110 transition-transform duration-200">
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white fill-current" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Watch Record
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {session.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(session.date)}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          <a href={session.youtubeLink} target="_blank" rel="noopener noreferrer">
                            {session.title}
                          </a>
                        </h3>
                        {session.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{session.description}</p>
                        )}

                        <div className="flex justify-center mt-2">
                          <a
                            href={session.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Watch on YouTube
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
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
