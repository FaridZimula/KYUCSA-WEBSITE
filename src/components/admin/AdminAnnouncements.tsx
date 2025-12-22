import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Megaphone, Link as LinkIcon, Calendar } from 'lucide-react';
import { announcementsManager, Announcement } from '../../utils/dataManager';

const AdminAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState<Partial<Announcement>>({});

    const categories = ['General', 'Job Opportunity', 'Event', 'Academic'];

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        setLoading(true);
        const data = await announcementsManager.getAll();
        setAnnouncements(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            await announcementsManager.delete(id);
            loadAnnouncements();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editItem.title || !editItem.description) return;

        const announcementData = {
            ...editItem,
            id: editItem.id || 0,
            title: editItem.title || '',
            category: editItem.category || 'General',
            date: editItem.date || new Date().toISOString().split('T')[0],
            description: editItem.description || '',
            link: editItem.link || '#'
        } as Announcement;

        if (editItem.id) {
            await announcementsManager.update(announcementData);
        } else {
            await announcementsManager.add(announcementData);
        }

        setIsEditing(false);
        setEditItem({});
        loadAnnouncements();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Announcements Management</h2>
                    <p className="text-gray-500">Manage site announcements, news, and updates</p>
                </div>
                <button
                    onClick={() => {
                        setEditItem({ category: 'General', date: new Date().toISOString().split('T')[0] });
                        setIsEditing(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Announcement
                </button>
            </div>

            {/* List View */}
            {!isEditing ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading announcements...</div>
                    ) : announcements.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No announcements yet</p>
                            <p className="text-sm">Create one to get started</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {announcements.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                                    ${item.category === 'Job Opportunity' ? 'bg-green-100 text-green-700' :
                                                        item.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                                                            item.category === 'Event' ? 'bg-purple-100 text-purple-700' :
                                                                'bg-gray-100 text-gray-700'}`}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditItem(item);
                                                            setIsEditing(true);
                                                        }}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                // Edit Form
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            {editItem.id ? 'Edit Announcement' : 'New Announcement'}
                        </h3>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                value={editItem.title || ''}
                                onChange={e => setEditItem({ ...editItem, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="E.g., Internship at Google"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={editItem.category || 'General'}
                                    onChange={e => setEditItem({ ...editItem, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={editItem.date || ''}
                                        onChange={e => setEditItem({ ...editItem, date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={editItem.description || ''}
                                onChange={e => setEditItem({ ...editItem, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Details about the announcement..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={editItem.link || ''}
                                    onChange={e => setEditItem({ ...editItem, link: e.target.value })}
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="https://..."
                                />
                                <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                            >
                                <Save className="h-4 w-4" />
                                Save Announcement
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminAnnouncements;
