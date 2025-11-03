import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { sessionsManager, Session } from '../../utils/dataManager';

const AdminSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Session>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    attendees: 0,
    maxAttendees: 50,
    category: 'Workshop',
    flyer: '',
    instructor: '',
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const data = sessionsManager.getAll();
    setSessions(data);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      attendees: 0,
      maxAttendees: 50,
      category: 'Workshop',
      flyer: '',
      instructor: '',
    });
    setEditingSession(null);
    setShowForm(true);
  };

  const handleEdit = (session: Session) => {
    setFormData(session);
    setEditingSession(session);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this session?')) {
      sessionsManager.delete(id);
      loadSessions();
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    const sessionData: Session = {
      id: editingSession?.id || Date.now(),
      title: formData.title!,
      date: formData.date!,
      time: formData.time || '',
      location: formData.location!,
      description: formData.description || '',
      attendees: formData.attendees || 0,
      maxAttendees: formData.maxAttendees || 50,
      category: formData.category || 'Workshop',
      flyer: formData.flyer || '',
      instructor: formData.instructor || '',
    };

    if (editingSession) {
      sessionsManager.update(sessionData);
    } else {
      sessionsManager.add(sessionData);
    }

    loadSessions();
    setShowForm(false);
    setEditingSession(null);
    setFormData({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSession(null);
    setFormData({});
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sessions Management</h2>
          <p className="text-gray-600">Manage training sessions and workshops</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Session
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingSession ? 'Edit Session' : 'Add New Session'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Session title"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Session description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Lab 301"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
              <input
                type="text"
                value={formData.instructor || ''}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Instructor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category || 'Workshop'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>Workshop</option>
                <option>Training</option>
                <option>Seminar</option>
                <option>Talk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flyer URL</label>
              <input
                type="url"
                value={formData.flyer || ''}
                onChange={(e) => setFormData({ ...formData, flyer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Flyer image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Attendees</label>
              <input
                type="number"
                value={formData.attendees || 0}
                onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
              <input
                type="number"
                value={formData.maxAttendees || 50}
                onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) || 50 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sessions List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            All Sessions <span className="text-sm text-gray-500">({sessions.length} sessions)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Instructor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Attendees</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No sessions found. Click "Add Session" to get started.
                  </td>
                </tr>
              ) : (
                sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{session.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(session.date)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{session.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{session.instructor || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {session.attendees} / {session.maxAttendees}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(session)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSessions;

