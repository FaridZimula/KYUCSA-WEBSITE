import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Video, Image as ImageIcon } from 'lucide-react';
import { sessionsManager, eventsManager, Session, Event } from '../../utils/dataManager';
import { seedDatabase } from '../../utils/seedSessionsData';

const AdminSessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'events' | 'past'>('upcoming');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Unified editing state
  const [editingItem, setEditingItem] = useState<Session | Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({}); // Using any for flexibility across Session/Event types

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const sessions = await sessionsManager.getAll();
    const events = await eventsManager.getAll();
    setSessions(sessions);
    setEvents(events);
  };

  const upcomingSessions = sessions.filter(s => !s.isPast);
  const pastSessions = sessions.filter(s => s.isPast);

  const handleAddItem = () => {
    const baseData = {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      attendees: 0,
      maxAttendees: 50,
      category: 'Workshop',
    };

    if (activeTab === 'events') {
      setFormData({ ...baseData, flyer: '', maxAttendees: 100, category: 'Conference' });
    } else if (activeTab === 'past') {
      setFormData({ ...baseData, isPast: true, youtubeLink: '', thumbnail: '' });
    } else {
      setFormData({ ...baseData, isPast: false, flyer: '', instructor: '' });
    }

    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: Session | Event) => {
    setFormData({ ...item });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'events') {
        await eventsManager.delete(id);
      } else {
        await sessionsManager.delete(id);
      }
      await loadData();
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.date) {
      alert('Please fill in required fields');
      return;
    }

    const id = editingItem?.id || Date.now();

    if (activeTab === 'events') {
      const eventData: Event = {
        id,
        title: formData.title,
        date: formData.date,
        time: formData.time || '',
        location: formData.location || '',
        description: formData.description || '',
        attendees: parseInt(formData.attendees) || 0,
        maxAttendees: parseInt(formData.maxAttendees) || 100,
        category: formData.category || 'Conference',
        flyer: formData.flyer || '',
      };
      if (editingItem) await eventsManager.update(eventData);
      else await eventsManager.add(eventData);

    } else {
      // Session (Upcoming or Past)
      const sessionData: Session = {
        id,
        title: formData.title,
        date: formData.date,
        time: formData.time || '',
        location: formData.location || '',
        description: formData.description || '',
        attendees: parseInt(formData.attendees) || 0,
        maxAttendees: parseInt(formData.maxAttendees) || 50,
        category: formData.category || 'Workshop',
        flyer: formData.flyer || '',
        instructor: formData.instructor || '',
        isPast: activeTab === 'past' || formData.isPast,
        youtubeLink: formData.youtubeLink,
        thumbnail: formData.thumbnail,
      };
      if (editingItem) await sessionsManager.update(sessionData);
      else await sessionsManager.add(sessionData);
    }

    await loadData();
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sessions & Events</h2>
          <p className="text-gray-600">Manage all activities</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => seedDatabase()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Restore Demo Data
          </button>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add {activeTab === 'events' ? 'Event' : activeTab === 'past' ? 'Past Session' : 'Session'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('upcoming'); setShowForm(false); }}
          className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${activeTab === 'upcoming'
            ? 'border-b-2 border-secondary-500 text-secondary-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Upcoming Sessions
        </button>
        <button
          onClick={() => { setActiveTab('events'); setShowForm(false); }}
          className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${activeTab === 'events'
            ? 'border-b-2 border-secondary-500 text-secondary-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Events
        </button>
        <button
          onClick={() => { setActiveTab('past'); setShowForm(false); }}
          className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${activeTab === 'past'
            ? 'border-b-2 border-secondary-500 text-secondary-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Past Sessions
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 capitalize">
            {editingItem ? 'Edit' : 'Add'} {activeTab === 'events' ? 'Event' : activeTab === 'past' ? 'Past Session' : 'Session'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                <option>Workshop</option>
                <option>Training</option>
                <option>Seminar</option>
                <option>Conference</option>
                <option>Competition</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-md" />
            </div>

            {/* Specific Fields based on Type */}
            {(activeTab === 'upcoming' || activeTab === 'events') && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Flyer Image (URL)</label>
                <input type="url" value={formData.flyer} onChange={e => setFormData({ ...formData, flyer: e.target.value })} className="w-full px-3 py-2 border rounded-md" placeholder="https://..." />
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <input type="text" value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
              </div>
            )}

            {activeTab === 'past' && (
              <>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
                  <input type="url" value={formData.youtubeLink} onChange={e => setFormData({ ...formData, youtubeLink: e.target.value })} className="w-full px-3 py-2 border rounded-md" placeholder="https://youtube.com/..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
                  {formData.thumbnail && <img src={formData.thumbnail} alt="Thumbnail preview" className="h-20 mb-2 rounded shadow-sm" />}
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <span>Upload Thumbnail</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setFormData({ ...formData, thumbnail: reader.result as string });
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </>
            )}

          </div>

          <div className="flex gap-3 mt-6 justify-end">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center gap-2"><Save size={16} /> Save</button>
          </div>
        </div>
      )}

      {/* List Display */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activeTab === 'events' ? (
              events.map(event => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(event)} className="text-secondary-600 hover:text-secondary-900 mr-4"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              (activeTab === 'upcoming' ? upcomingSessions : pastSessions).map(session => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {session.title}
                    {session.youtubeLink && <Video size={14} className="inline ml-2 text-red-500" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(session)} className="text-secondary-600 hover:text-secondary-900 mr-4"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(session.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
            {((activeTab === 'events' && events.length === 0) || (activeTab !== 'events' && (activeTab === 'upcoming' ? upcomingSessions : pastSessions).length === 0)) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No items found. Click "Add" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSessions;
