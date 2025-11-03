import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Crown } from 'lucide-react';
import { leadershipManager, LeadershipMember } from '../../utils/dataManager';

const AdminLeadership: React.FC = () => {
  const [president, setPresident] = useState<LeadershipMember | null>(null);
  const [executives, setExecutives] = useState<LeadershipMember[]>([]);
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null);
  const [isEditingPresident, setIsEditingPresident] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<LeadershipMember>>({
    name: '',
    position: '',
    year: '',
    course: '',
    bio: '',
    email: '',
    image: '',
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState('');

  useEffect(() => {
    loadLeadership();
  }, []);

  const loadLeadership = () => {
    const data = leadershipManager.getAll();
    setPresident(data.president);
    setExecutives(data.executives);
  };

  const handleAddExecutive = () => {
    setFormData({
      name: '',
      position: '',
      year: '',
      course: '',
      bio: '',
      email: '',
      image: '',
      achievements: [],
    });
    setEditingMember(null);
    setIsEditingPresident(false);
    setShowForm(true);
  };

  const handleEdit = (member: LeadershipMember, isPresident: boolean = false) => {
    setFormData(member);
    setEditingMember(member);
    setIsEditingPresident(isPresident);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this leadership member?')) {
      leadershipManager.deleteExecutive(id);
      loadLeadership();
    }
  };

  const handleEditPresident = () => {
    if (president) {
      handleEdit(president, true);
    } else {
      setIsEditingPresident(true);
      setEditingMember(null);
      setFormData({
        name: '',
        position: 'President',
        year: '',
        course: '',
        bio: '',
        email: '',
        image: '',
        achievements: [],
      });
      setShowForm(true);
    }
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter(a => a !== achievement) || [],
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.position || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const memberData: LeadershipMember = {
      id: editingMember?.id || Date.now(),
      name: formData.name!,
      position: formData.position!,
      year: formData.year || '',
      course: formData.course || '',
      bio: formData.bio || '',
      email: formData.email!,
      image: formData.image || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: formData.achievements || [],
    };

    if (isEditingPresident) {
      leadershipManager.setPresident(memberData);
    } else {
      if (editingMember) {
        leadershipManager.updateExecutive(memberData);
      } else {
        leadershipManager.addExecutive(memberData);
      }
    }

    loadLeadership();
    setShowForm(false);
    setEditingMember(null);
    setIsEditingPresident(false);
    setFormData({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
    setIsEditingPresident(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leadership Management</h2>
          <p className="text-gray-600">Manage leadership team members</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEditPresident}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Crown className="h-5 w-5" />
            {president ? 'Edit President' : 'Add President'}
          </button>
          <button
            onClick={handleAddExecutive}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Executive
          </button>
        </div>
      </div>

      {/* President Section */}
      {president && (
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              President
            </h3>
            <button
              onClick={() => handleEdit(president, true)}
              className="flex items-center gap-2 px-3 py-1 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors text-sm"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{president.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium text-gray-900">{president.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{president.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Year & Course</p>
              <p className="font-medium text-gray-900">{president.year} • {president.course}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {isEditingPresident 
              ? (president ? 'Edit President' : 'Add President')
              : (editingMember ? 'Edit Executive' : 'Add New Executive')
            }
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Position title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="email@kyucsa.org"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Year 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <input
                type="text"
                value={formData.course || ''}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Image URL"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Biography"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Add achievement (press Enter)"
                />
                <button
                  onClick={addAchievement}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.achievements?.map((achievement, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {achievement}
                    <button
                      onClick={() => removeAchievement(achievement)}
                      className="text-primary-700 hover:text-primary-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
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

      {/* Executives List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            Executive Members <span className="text-sm text-gray-500">({executives.length} members)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Year</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {executives.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No executives found. Click "Add Executive" to get started.
                  </td>
                </tr>
              ) : (
                executives.map((executive) => (
                  <tr key={executive.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{executive.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.year}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(executive, false)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(executive.id)}
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

export default AdminLeadership;

