import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Crown, Upload, Mail, Link as LinkIcon } from 'lucide-react';
import { leadershipManager, LeadershipMember } from '../../utils/dataManager';

const AdminLeadership: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [availableYears, setAvailableYears] = useState(['2025-2026', '2024-2025']);

  useEffect(() => {
    loadLeadership();
  }, [selectedYear]);

  const loadLeadership = async () => {
    const data = await leadershipManager.getAll();
    // Default to empty structure if year doesn't exist
    const currentYearData = data[selectedYear] || { president: null, executives: [] };
    setPresident(currentYearData.president);
    setExecutives(currentYearData.executives || []);

    // Update available years from data keys if needed, 
    // but better to keep a stable list or derive it.
    const years = Object.keys(data).sort().reverse();
    if (years.length > 0) {
      // Ensure the years we want are always there
      const requiredYears = ['2025-2026', '2024-2025'];
      setAvailableYears(Array.from(new Set([...years, ...requiredYears])).sort().reverse());
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleAddYear = () => {
    const newYear = prompt("Enter new cabinet year (e.g., 2026-2027):");
    if (newYear && !availableYears.includes(newYear)) {
      setAvailableYears([newYear, ...availableYears].sort().reverse());
      setSelectedYear(newYear);
    }
  };

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
    linkedin: '',
  });
  const [achievementInput, setAchievementInput] = useState('');

  const handleAddExecutive = () => {
    setFormData({
      name: '',
      position: '',
      year: selectedYear, // Default to selected year
      course: '',
      bio: '',
      email: '',
      image: '',
      achievements: [],
      linkedin: '',
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

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this leadership member?')) {
      await leadershipManager.deleteExecutive(id);
      await loadLeadership();
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
        year: selectedYear,
        course: '',
        bio: '',
        email: '',
        image: '',
        achievements: [],
        linkedin: '',
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

  const handleSave = async () => {
    if (!formData.name || !formData.position || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const memberData: LeadershipMember = {
      id: editingMember?.id || Date.now(),
      name: formData.name!,
      position: formData.position!,
      year: formData.year || selectedYear, // Use form year or selected year
      course: formData.course || '',
      bio: formData.bio || '',
      email: formData.email!,
      image: formData.image || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: formData.achievements || [],
      linkedin: formData.linkedin,
    };

    if (isEditingPresident) {
      await leadershipManager.setPresident(memberData);
    } else {
      if (editingMember) {
        await leadershipManager.updateExecutive(memberData);
      } else {
        await leadershipManager.addExecutive(memberData);
      }
    }

    await loadLeadership();
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
      <div className="flex flex-col items-center gap-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leadership Management</h2>
          <p className="text-gray-600">Manage leadership team members</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Year Selector */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-sm text-gray-500 mr-2">Cabinet Year:</span>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="text-sm font-medium text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddYear} className="text-sm text-primary-600 hover:text-primary-700 font-medium px-2">
            + New Year
          </button>

          <button
            onClick={handleEditPresident}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <Crown className="h-5 w-5" />
            {president ? 'Edit President' : 'Add President'}
          </button>
          <button
            onClick={handleAddExecutive}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Executive
          </button>
        </div>
      </div>

      {/* President Section */}
      {president && (
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-primary-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Crown className="h-32 w-32 text-primary-500" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              President ({selectedYear})
            </h3>
            <button
              onClick={() => handleEdit(president, true)}
              className="flex items-center gap-2 px-3 py-1 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors text-sm"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <img src={president.image} alt={president.name} className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{president.name}</p>
              </div>
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
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            {isEditingPresident
              ? (president ? 'Edit President' : 'Add President')
              : (editingMember ? 'Edit Executive' : 'Add New Executive')
            }
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Position title"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="email@kyucsa.org"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                value={formData.year || selectedYear}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Cabinet Year"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                value={formData.course || ''}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Course name"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-full border border-gray-200" />
                )}
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Biography"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialisations</label>
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
            {selectedYear} Cabinet <span className="text-sm text-gray-500">({executives.length} executives)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Course</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {executives.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No executives found for {selectedYear}.
                  </td>
                </tr>
              ) : (
                executives.map((executive) => (
                  <tr key={executive.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 flex items-center gap-3">
                      {executive.image && <img src={executive.image} className="h-8 w-8 rounded-full object-cover" />}
                      {executive.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{executive.course}</td>
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
