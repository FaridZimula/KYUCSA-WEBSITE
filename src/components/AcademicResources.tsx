import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, Filter, FileText } from 'lucide-react';
import { notesManager, Note } from '../utils/dataManager';

interface AcademicResourcesProps {
  setCurrentPage: (page: string) => void;
}

const AcademicResources: React.FC<AcademicResourcesProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<Record<string, Record<string, Note[]>>>({
    bitc: { year1: [], year2: [], year3: [] },
    bis: { year1: [], year2: [], year3: [] },
    blis: { year1: [], year2: [], year3: [] },
    cs: { year1: [], year2: [], year3: [] },
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const data = await notesManager.getAll();
    setDocuments(data);
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'bitc', name: 'BITC Notes' },
    { id: 'bis', name: 'BIS Notes' },
    { id: 'blis', name: 'BLIS Notes' },
    { id: 'cs', name: 'Computer Science Notes' }
  ];

  const years = [
    { id: 'all', name: 'All Years' },
    { id: 'year1', name: 'Year 1' },
    { id: 'year2', name: 'Year 2' },
    { id: 'year3', name: 'Year 3' }
  ];

  const getAllDocuments = () => {
    const allDocs: Note[] = [];
    Object.keys(documents).forEach(category => {
      Object.keys(documents[category]).forEach(year => {
        allDocs.push(...documents[category][year as 'year1' | 'year2' | 'year3']);
      });
    });
    return allDocs;
  };

  const getFilteredDocuments = () => {
    let filteredDocs: Note[] = [];

    if (selectedCategory === 'all') {
      if (selectedYear === 'all') {
        filteredDocs = getAllDocuments();
      } else {
        Object.keys(documents).forEach(category => {
          if (documents[category][selectedYear as 'year1' | 'year2' | 'year3']) {
            filteredDocs.push(...documents[category][selectedYear as 'year1' | 'year2' | 'year3']);
          }
        });
      }
    } else {
      if (selectedYear === 'all') {
        Object.keys(documents[selectedCategory]).forEach(year => {
          filteredDocs.push(...documents[selectedCategory][year as 'year1' | 'year2' | 'year3']);
        });
      } else {
        filteredDocs = documents[selectedCategory][selectedYear as 'year1' | 'year2' | 'year3'] || [];
      }
    }

    if (searchTerm) {
      filteredDocs = filteredDocs.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredDocs;
  };

  const filteredDocuments = getFilteredDocuments();

  // Calculate category counts
  const categoryCounts = categories.map(cat => {
    if (cat.id === 'all') {
      return { ...cat, count: getAllDocuments().length };
    }
    let count = 0;
    Object.keys(documents[cat.id]).forEach(year => {
      count += documents[cat.id][year as 'year1' | 'year2' | 'year3']?.length || 0;
    });
    return { ...cat, count };
  });

  const handleDownload = (doc: Note) => {
    if (doc.fileData) {
      // Handle Base64 download
      const link = document.createElement('a');
      link.href = doc.fileData;
      link.download = doc.name; // Use the note name as filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.url) {
      // Handle External URL
      window.open(doc.url, '_blank');
    } else {
      alert('No download available for this item.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img
            src="/Home Slide 3 (1).jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Academic Resources
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Access comprehensive study materials organized by program and year of study
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[180px] text-sm sm:text-base"
              >
                {categoryCounts.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} {category.id !== 'all' && `(${category.count})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[120px] text-sm sm:text-base"
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

        {/* Category and Year Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categoryCounts.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category.name} {category.id !== 'all' && `(${category.count})`}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${selectedYear === year.id
                  ? 'bg-secondary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {year.name}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-primary-500" />
                </div>
                <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {document.type}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{document.name}</h3>

              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-4">
                <span>Size: {document.size}</span>
                <span>{document.downloads} downloads</span>
              </div>

              <button
                onClick={() => handleDownload(document)}
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Upload Request */}
        <div className="mt-12 bg-primary-500 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-sm sm:text-base text-blue-100 mb-6">
            Request specific notes or contribute your own study materials to help fellow students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Request Notes
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              Contribute Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicResources;



