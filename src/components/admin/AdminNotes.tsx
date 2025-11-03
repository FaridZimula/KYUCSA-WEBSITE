import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { notesManager, Note } from '../../utils/dataManager';

const AdminNotes: React.FC = () => {
  const [notes, setNotes] = useState<Record<string, Record<string, Note[]>>>({});
  const [selectedCategory, setSelectedCategory] = useState<'bitc' | 'bis' | 'blis' | 'cs'>('bitc');
  const [selectedYear, setSelectedYear] = useState<'year1' | 'year2' | 'year3'>('year1');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Note>>({
    name: '',
    type: 'PDF',
    size: '',
    downloads: 0,
    category: 'bitc',
    year: 'year1',
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const data = notesManager.getAll();
    setNotes(data);
  };

  const categories = [
    { id: 'bitc' as const, name: 'BITC Notes' },
    { id: 'bis' as const, name: 'BIS Notes' },
    { id: 'blis' as const, name: 'BLIS Notes' },
    { id: 'cs' as const, name: 'CS Notes' },
  ];

  const years = [
    { id: 'year1' as const, name: 'Year 1' },
    { id: 'year2' as const, name: 'Year 2' },
    { id: 'year3' as const, name: 'Year 3' },
  ];

  const currentNotes = notes[selectedCategory]?.[selectedYear] || [];

  const handleAdd = () => {
    setFormData({
      name: '',
      type: 'PDF',
      size: '',
      downloads: 0,
      category: selectedCategory,
      year: selectedYear,
    });
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEdit = (note: Note) => {
    setFormData(note);
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      notesManager.delete(selectedCategory, selectedYear, id);
      loadNotes();
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.size) {
      alert('Please fill in all required fields');
      return;
    }

    const noteData: Note = {
      id: editingNote?.id || Date.now(),
      name: formData.name!,
      type: formData.type || 'PDF',
      size: formData.size!,
      downloads: formData.downloads || 0,
      category: formData.category || selectedCategory,
      year: formData.year || selectedYear,
    };

    if (editingNote) {
      notesManager.update(noteData);
    } else {
      notesManager.add(noteData);
    }

    loadNotes();
    setShowForm(false);
    setEditingNote(null);
    setFormData({ name: '', type: 'PDF', size: '', downloads: 0 });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
    setFormData({ name: '', type: 'PDF', size: '', downloads: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notes Management</h2>
          <p className="text-gray-600">Manage course notes and documents</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Note
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as typeof selectedYear)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Introduction to Programming - BITC 1101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type || 'PDF'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>PDF</option>
                <option>DOCX</option>
                <option>PPTX</option>
                <option>ZIP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size *</label>
              <input
                type="text"
                value={formData.size || ''}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 2.5 MB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Downloads</label>
              <input
                type="number"
                value={formData.downloads || 0}
                onChange={(e) => setFormData({ ...formData, downloads: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category || selectedCategory}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof selectedCategory })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={formData.year || selectedYear}
                onChange={(e) => setFormData({ ...formData, year: e.target.value as typeof selectedYear })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
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

      {/* Notes List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            {categories.find(c => c.id === selectedCategory)?.name} - {years.find(y => y.id === selectedYear)?.name}
            <span className="ml-2 text-sm text-gray-500">({currentNotes.length} notes)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Downloads</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentNotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No notes found. Click "Add Note" to get started.
                  </td>
                </tr>
              ) : (
                currentNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{note.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{note.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{note.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{note.downloads}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
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

export default AdminNotes;

