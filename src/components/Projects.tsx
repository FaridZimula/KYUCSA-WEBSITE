import React, { useState, useEffect } from 'react';
import { ExternalLink, Star, Eye, Users } from 'lucide-react';
import { projectsManager, Project } from '../utils/dataManager';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);

  // Default projects if localStorage is empty (for initial setup)
  const defaultProjects: Project[] = [
    {
      id: 1,
      title: 'University Management System',
      description: 'A comprehensive web application for managing student records, courses, and academic information.',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      author: 'John Mukasa',
      year: '2024',
      stars: 45,
      views: 1200,
      collaborators: 3,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    },
    {
      id: 2,
      title: 'AI-Powered Study Assistant',
      description: 'Machine learning application that helps students with personalized study recommendations.',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
      author: 'Sarah Nakato',
      year: '2024',
      stars: 67,
      views: 890,
      collaborators: 2,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    },
    {
      id: 3,
      title: 'Campus Navigation Mobile App',
      description: 'Flutter mobile app for navigating Kyambogo University campus with AR features.',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'ARCore'],
      author: 'David Ssebugwawo',
      year: '2023',
      stars: 32,
      views: 756,
      collaborators: 4,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    },
    {
      id: 4,
      title: 'Library Management System',
      description: 'Desktop application for managing library resources, book lending, and student records.',
      category: 'web',
      technologies: ['Java', 'JavaFX', 'MySQL', 'Scene Builder'],
      author: 'Grace Namutebi',
      year: '2023',
      stars: 28,
      views: 634,
      collaborators: 1,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management.',
      category: 'web',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      author: 'Peter Kiggundu',
      year: '2024',
      stars: 89,
      views: 1456,
      collaborators: 5,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    },
    {
      id: 6,
      title: 'Social Media Analytics Dashboard',
      description: 'Real-time analytics dashboard for social media performance tracking and insights.',
      category: 'ai',
      technologies: ['Python', 'Django', 'React', 'Chart.js'],
      author: 'Maria Nassali',
      year: '2023',
      stars: 41,
      views: 823,
      collaborators: 3,
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
      projectUrl: '#'
    }
  ];

  const loadProjects = () => {
    const data = projectsManager.getAll();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
    // Initialize with default projects if empty
    const currentProjects = projectsManager.getAll();
    if (currentProjects.length === 0 && defaultProjects.length > 0) {
      defaultProjects.forEach(project => {
        projectsManager.add(project);
      });
      loadProjects();
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'web', name: 'Web Development', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Student Projects Showcase
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover amazing projects built by our talented computing students
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${
                filter === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isBlue = index % 2 === 0;
            return (
              <div key={project.id} className="flip-card h-96">
                <div className="flip-card-inner">
                  {/* Front of card */}
                  <div className="flip-card-front bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1 flex-1">{project.title}</h3>
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                          {project.year}
                        </span>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">By {project.author}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className={`flip-card-back ${isBlue ? 'bg-primary-500' : 'bg-secondary-500'} text-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col justify-between`}>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-sm sm:text-base mb-4 opacity-90">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-white bg-opacity-20 text-white px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <span className="flex items-center">
                            <Star className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            {project.stars}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            {project.views}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            {project.collaborators}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => window.open(project.projectUrl, '_blank')}
                      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center text-sm sm:text-base border border-white border-opacity-30"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Projects;