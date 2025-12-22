import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Star, Eye } from 'lucide-react';
import { projectsManager, Project } from '../../utils/dataManager';
import { seedProjectsDatabase } from '../../utils/seedProjectsData';

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
    year: '2025',
    stars: 0,
    views: 0,
    collaborators: 1,
    image: '',
    projectUrl: '',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const projects = await projectsManager.getAll();
    setProjects(projects);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web',
      technologies: [],
      author: '',
      year: new Date().getFullYear().toString(),
      stars: 0,
      views: 0,
      collaborators: 1,
      image: '',
      projectUrl: '',
    });
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await projectsManager.delete(id);
      await loadProjects();
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.author) {
      alert('Please fill in required fields (Title, Description, Author)');
      return;
    }

    const projectData: Project = {
      id: editingProject?.id || Date.now(),
      title: formData.title!,
      description: formData.description!,
      category: formData.category as 'web' | 'mobile' | 'ai' || 'web',
      technologies: formData.technologies || [],
      author: formData.author!,
      year: formData.year || '2025',
      stars: formData.stars || 0,
      views: formData.views || 0,
      collaborators: formData.collaborators || 1,
      image: formData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
      projectUrl: formData.projectUrl || '#',
    };

    if (editingProject) {
      await projectsManager.update(projectData);
    } else {
      await projectsManager.add(projectData);
    }

    await loadProjects();
    setShowForm(false);
    setEditingProject(null);
    setFormData({});
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t !== tech) || []
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-gray-600">Showcase student projects</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => seedProjectsDatabase()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Restore Default Projects
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author(s) *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. John Doe, Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={e => setFormData({ ...formData, projectUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI / ML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Add tech..."
                  />
                  <button onClick={addTech} type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map(tech => (
                    <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                      {tech}
                      <button onClick={() => removeTech(tech)}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mb-2 h-40 w-full object-cover rounded-md border border-gray-200" />
                )}
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
                  <input type="number" value={formData.stars} onChange={e => setFormData({ ...formData, stars: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Views</label>
                  <input type="number" value={formData.views} onChange={e => setFormData({ ...formData, views: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Collabs</label>
                  <input type="number" value={formData.collaborators} onChange={e => setFormData({ ...formData, collaborators: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center gap-2">
              <Save size={18} /> Save Project
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100 relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-2 bg-white/90 rounded-full text-primary-600 hover:text-primary-700 shadow-sm"><Edit size={16} /></button>
                <button onClick={() => handleDelete(project.id)} className="p-2 bg-white/90 rounded-full text-red-600 hover:text-red-700 shadow-sm"><Trash2 size={16} /></button>
              </div>
              <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-md capitalize">
                {project.category}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-3">By {project.author}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">{t}</span>
                ))}
                {project.technologies.length > 3 && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">+{project.technologies.length - 3}</span>}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1"><Star size={14} /> {project.stars}</span>
                  <span className="flex items-center gap-1"><Eye size={14} /> {project.views}</span>
                </div>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p>No projects found. Add one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
