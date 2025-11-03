import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { projectsManager, Project } from '../../utils/dataManager';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'web',
    technologies: [],
    author: '',
    year: '2024',
    stars: 0,
    views: 0,
    collaborators: 1,
    image: '',
    projectUrl: '#',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = projectsManager.getAll();
    setProjects(data);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web',
      technologies: [],
      author: '',
      year: '2024',
      stars: 0,
      views: 0,
      collaborators: 1,
      image: '',
      projectUrl: '#',
    });
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      projectsManager.delete(id);
      loadProjects();
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter(t => t !== tech) || [],
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.author) {
      alert('Please fill in all required fields');
      return;
    }

    const projectData: Project = {
      id: editingProject?.id || Date.now(),
      title: formData.title!,
      description: formData.description!,
      category: formData.category || 'web',
      technologies: formData.technologies || [],
      author: formData.author!,
      year: formData.year || '2024',
      stars: formData.stars || 0,
      views: formData.views || 0,
      collaborators: formData.collaborators || 1,
      image: formData.image || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: formData.projectUrl || '#',
    };

    if (editingProject) {
      projectsManager.update(projectData);
    } else {
      projectsManager.add(projectData);
    }

    loadProjects();
    setShowForm(false);
    setEditingProject(null);
    setFormData({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-gray-600">Manage student projects showcase</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Project
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Project title"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Project description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category || 'web'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'mobile' | 'ai' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Apps</option>
                <option value="ai">AI/ML</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                value={formData.year || '2024'}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
              <input
                type="url"
                value={formData.projectUrl || '#'}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Project URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stars</label>
              <input
                type="number"
                value={formData.stars || 0}
                onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Views</label>
              <input
                type="number"
                value={formData.views || 0}
                onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Collaborators</label>
              <input
                type="number"
                value={formData.collaborators || 1}
                onChange={(e) => setFormData({ ...formData, collaborators: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Add technology (press Enter)"
                />
                <button
                  onClick={addTechnology}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(tech)}
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

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            All Projects <span className="text-sm text-gray-500">({projects.length} projects)</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Year</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No projects found. Click "Add Project" to get started.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{project.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 capitalize">{project.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{project.author}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{project.year}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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

export default AdminProjects;

