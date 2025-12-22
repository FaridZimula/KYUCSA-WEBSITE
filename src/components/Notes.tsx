import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, FileText, ArrowLeft, Folder, ChevronRight, GraduationCap, Calendar, Book } from 'lucide-react';
import { Note, notesManager } from '../utils/dataManager';

interface NotesProps {
  setCurrentPage: (page: string) => void;
}

// Extended Note type locally if needed, or rely on dataManager.
// We need to ensure the local mock data matches the Note interface + semester.

const Notes: React.FC<NotesProps> = ({ setCurrentPage }) => {
  // Navigation State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Course, 2: Year, 3: Semester, 4: Notes
  const [selectedCategory, setSelectedCategory] = useState<'bitc' | 'bis' | 'blis' | 'cs' | null>(null);
  const [selectedYear, setSelectedYear] = useState<'year1' | 'year2' | 'year3' | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<'semester1' | 'semester2' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Categories / Courses
  const categories = [
    { id: 'bitc', name: 'BITC', fullName: 'Bachelor of Information Technology & Computing', icon: <GraduationCap className="h-8 w-8 text-blue-500" /> },
    { id: 'bis', name: 'BIS', fullName: 'Bachelor of Information Systems', icon: <Book className="h-8 w-8 text-purple-500" /> },
    { id: 'blis', name: 'BLIS', fullName: 'Bachelor of Library & Information Science', icon: <Folder className="h-8 w-8 text-green-500" /> },
    { id: 'cs', name: 'CS', fullName: 'Bachelor of Computer Science', icon: <FileText className="h-8 w-8 text-red-500" /> }
  ];

  // Years
  const years = [
    { id: 'year1', name: 'Year 1', description: 'Foundation & Principles' },
    { id: 'year2', name: 'Year 2', description: 'Core Concepts & Applications' },
    { id: 'year3', name: 'Year 3', description: 'Advanced Topics & Projects' }
  ];

  // Semesters
  const semesters = [
    { id: 'semester1', name: 'Semester 1', description: 'First half of the academic year' },
    { id: 'semester2', name: 'Semester 2', description: 'Second half of the academic year' }
  ];

  // Mock Data Generator
  const generateMockNotes = (): Note[] => {
    const data: Note[] = [];

    // BITC Data
    const bitcSubjects = {
      year1: ['Introduction to Programming', 'Computer Systems', 'Mathematics for Computing', 'Digital Logic', 'Communication Skills', 'Web Technologies'],
      year2: ['OOP', 'Data Structures', 'Database Systems', 'Computer Networks', 'Software Engineering', 'System Analysis'],
      year3: ['Advanced Programming', 'AI', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Research Methods']
    };

    // Helper to add notes
    const addNotes = (cat: 'bitc' | 'bis' | 'blis' | 'cs', year: 'year1' | 'year2' | 'year3', sem: 'semester1' | 'semester2', subjects: string[]) => {
      subjects.forEach((subj, idx) => {
        data.push({
          id: Date.now() + Math.random(), // Random ID for mock
          name: `${subj} - ${sem === 'semester1' ? 'Part A' : 'Part B'}`,
          type: 'PDF',
          size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
          downloads: Math.floor(Math.random() * 300) + 50,
          category: cat,
          year: year,
          semester: sem,
          url: '#' // Default no link for mocks
        });
      });
    };

    // Populate BITC
    Object.entries(bitcSubjects).forEach(([year, subjs]) => {
      const split = Math.floor(subjs.length / 2);
      addNotes('bitc', year as any, 'semester1', subjs.slice(0, split));
      addNotes('bitc', year as any, 'semester2', subjs.slice(split));
    });

    // Populate others similarly with generic names for brevity in this refactor
    const genericSubjects = ['Course Unit 1', 'Course Unit 2', 'Course Unit 3', 'Course Unit 4', 'Course Unit 5', 'Course Unit 6'];
    ['bis', 'blis', 'cs'].forEach(cat => {
      ['year1', 'year2', 'year3'].forEach(year => {
        addNotes(cat as any, year as any, 'semester1', genericSubjects.slice(0, 3));
        addNotes(cat as any, year as any, 'semester2', genericSubjects.slice(3, 6));
      });
    });

    return data;
  };

  const [documents, setDocuments] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const rawData = await notesManager.getAll();
      const loadedNotes: Note[] = [];

      Object.values(rawData).forEach(yearData => {
        Object.values(yearData).forEach(notes => {
          if (Array.isArray(notes)) {
            loadedNotes.push(...notes);
          }
        });
      });

      if (loadedNotes.length > 0) {
        setDocuments(loadedNotes);
      } else {
        const mocks = generateMockNotes();
        setDocuments(mocks);
      }
    };

    fetchNotes();
  }, []);

  const handleCourseSelect = (categoryId: string) => {
    setSelectedCategory(categoryId as any);
    setStep(2);
  };
  // ... existing navigation handlers ...

  const handleYearSelect = (yearId: string) => {
    setSelectedYear(yearId as any);
    setStep(3);
  };

  const handleSemesterSelect = (semesterId: string) => {
    setSelectedSemester(semesterId as any);
    setStep(4);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1 as any);
      if (step === 2) setSelectedCategory(null);
      if (step === 3) setSelectedYear(null);
      if (step === 4) setSelectedSemester(null);
    }
  };

  const handleDownload = (note: Note) => {
    if (note.fileData) {
      // Create a temporary link for Base64 download
      const link = document.createElement('a');
      link.href = note.fileData;
      // Try to determine extension from type or name, default to bin if unknown
      const extension = note.name.split('.').pop() || 'file';
      const fileName = note.name.toLowerCase().endsWith(extension.toLowerCase()) ? note.name : `${note.name}.${extension}`;

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (note.url && note.url !== '#') {
      window.open(note.url, '_blank');
      // Ideally increment download count here if we had backend
    } else {
      alert('This is a mock note. Real notes would be downloaded from an external URL.');
    }
  };

  // Filter Logic
  const filteredDocuments = documents.filter(doc => {
    if (step !== 4) return false;
    if (selectedCategory && doc.category !== selectedCategory) return false;
    if (selectedYear && doc.year !== selectedYear) return false;
    if (selectedSemester && doc.semester !== selectedSemester) return false; // Strict semester check
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... header ... */}
      <div className="bg-primary-500 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Academic Resources
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Access study materials organized by Course, Year, and Semester.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb / Back Navigation */}


        {/* Progress Indicator */}
        <div className="flex items-center mb-8 text-sm sm:text-base text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
          {/* ... steps ... */}
          <span className={step === 1 ? 'text-primary-600 font-bold' : ''}>Select Course</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className={step === 2 ? 'text-primary-600 font-bold' : ''}>Select Year</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className={step === 3 ? 'text-primary-600 font-bold' : ''}>Select Semester</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className={step === 4 ? 'text-primary-600 font-bold' : ''}>View Notes</span>
        </div>

        {/* STEP 1: SELECT COURSE */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* ... categories map ... */}
            {categories.map((cat, index) => {
              const isOrange = index % 2 === 0;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCourseSelect(cat.id)}
                  className={`px-10 py-8 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 ${isOrange
                    ? 'bg-secondary-500 hover:bg-secondary-600'
                    : 'bg-primary-500 hover:bg-primary-600'
                    }`}
                >
                  <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md">
                    {React.isValidElement(cat.icon)
                      ? React.cloneElement(cat.icon as React.ReactElement<any>, {
                        className: "h-8 w-8 text-white"
                      })
                      : cat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/90 text-sm sm:text-base">{cat.fullName}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: SELECT YEAR */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* ... years map ... */}
            {years.map((year, index) => {
              const isOrange = index % 2 === 0;
              return (
                <div
                  key={year.id}
                  onClick={() => handleYearSelect(year.id)}
                  className={`px-10 py-8 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 ${isOrange
                    ? 'bg-secondary-500 hover:bg-secondary-600'
                    : 'bg-primary-500 hover:bg-primary-600'
                    }`}
                >
                  <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{year.name}</h3>
                  <p className="text-white/90 text-sm">{year.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 3: SELECT SEMESTER */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {semesters.map((sem, index) => {
              const isOrange = index % 2 === 0;
              return (
                <div
                  key={sem.id}
                  onClick={() => handleSemesterSelect(sem.id)}
                  className={`px-10 py-8 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 ${isOrange
                    ? 'bg-secondary-500 hover:bg-secondary-600'
                    : 'bg-primary-500 hover:bg-primary-600'
                    }`}
                >
                  <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{sem.name}</h3>
                  <p className="text-white/90">{sem.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 4: VIEW NOTES */}
        {step === 4 && (
          <div>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search in selected notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.name} {years.find(y => y.id === selectedYear)?.name}
                </h2>
                <p className="text-primary-600 font-medium">{semesters.find(s => s.id === selectedSemester)?.name}</p>
              </div>
              <span className="mt-2 sm:mt-0 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {filteredDocuments.length} Documents
              </span>
            </div>

            {/* Documents List */}
            {filteredDocuments.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredDocuments.map((document) => (
                  <div key={document.id} className="bg-white border border-gray-200 rounded-xl px-10 py-6 sm:p-6 hover:shadow-lg transition-transform hover:-translate-y-1 duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-600" />
                      </div>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                        {document.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 text-center">{document.name}</h3>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{document.size}</span>
                      <span>{document.downloads} DLs</span>
                    </div>

                    <button
                      onClick={() => handleDownload(document)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // ... empty state ...
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  We couldn't find any documents for this selection. Try searching or check back later.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Request Notes
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Upload Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Bottom Back Button */}
        {step > 1 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={goBack}
              className="flex items-center text-white bg-primary-500 hover:bg-primary-600 font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;