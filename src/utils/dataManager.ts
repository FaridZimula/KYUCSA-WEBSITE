// Data management utilities for Admin Dashboard
// Using localStorage for data persistence

export interface Note {
  id: number;
  name: string;
  type: string;
  size: string;
  downloads: number;
  category: 'bitc' | 'bis' | 'blis' | 'cs';
  year: 'year1' | 'year2' | 'year3';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'ai';
  technologies: string[];
  author: string;
  year: string;
  stars: number;
  views: number;
  collaborators: number;
  image: string;
  projectUrl: string;
}

export interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  flyer: string;
  instructor: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  flyer: string;
}

export interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  year: string;
  course: string;
  bio: string;
  email: string;
  image: string;
  achievements: string[];
}

// Storage keys
const STORAGE_KEYS = {
  NOTES: 'kyucsa_notes',
  PROJECTS: 'kyucsa_projects',
  SESSIONS: 'kyucsa_sessions',
  EVENTS: 'kyucsa_events',
  LEADERSHIP: 'kyucsa_leadership',
};

// Helper functions
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Notes Management
export const notesManager = {
  getAll: (): Record<string, Record<string, Note[]>> => {
    return getStorageItem(STORAGE_KEYS.NOTES, {
      bitc: { year1: [], year2: [], year3: [] },
      bis: { year1: [], year2: [], year3: [] },
      blis: { year1: [], year2: [], year3: [] },
      cs: { year1: [], year2: [], year3: [] },
    });
  },

  setAll: (data: Record<string, Record<string, Note[]>>): void => {
    setStorageItem(STORAGE_KEYS.NOTES, data);
  },

  add: (note: Note): void => {
    const data = notesManager.getAll();
    if (!data[note.category]) {
      data[note.category] = { year1: [], year2: [], year3: [] };
    }
    if (!data[note.category][note.year]) {
      data[note.category][note.year] = [];
    }
    data[note.category][note.year].push(note);
    notesManager.setAll(data);
  },

  update: (note: Note): void => {
    const data = notesManager.getAll();
    if (data[note.category] && data[note.category][note.year]) {
      const index = data[note.category][note.year].findIndex(n => n.id === note.id);
      if (index !== -1) {
        data[note.category][note.year][index] = note;
        notesManager.setAll(data);
      }
    }
  },

  delete: (category: string, year: string, id: number): void => {
    const data = notesManager.getAll();
    if (data[category] && data[category][year as 'year1' | 'year2' | 'year3']) {
      data[category][year as 'year1' | 'year2' | 'year3'] = data[category][year as 'year1' | 'year2' | 'year3'].filter(n => n.id !== id);
      notesManager.setAll(data);
    }
  },
};

// Projects Management
export const projectsManager = {
  getAll: (): Project[] => {
    return getStorageItem(STORAGE_KEYS.PROJECTS, []);
  },

  setAll: (projects: Project[]): void => {
    setStorageItem(STORAGE_KEYS.PROJECTS, projects);
  },

  add: (project: Project): void => {
    const projects = projectsManager.getAll();
    projects.push(project);
    projectsManager.setAll(projects);
  },

  update: (project: Project): void => {
    const projects = projectsManager.getAll();
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      projects[index] = project;
      projectsManager.setAll(projects);
    }
  },

  delete: (id: number): void => {
    const projects = projectsManager.getAll();
    projectsManager.setAll(projects.filter(p => p.id !== id));
  },
};

// Sessions Management
export const sessionsManager = {
  getAll: (): Session[] => {
    return getStorageItem(STORAGE_KEYS.SESSIONS, []);
  },

  setAll: (sessions: Session[]): void => {
    setStorageItem(STORAGE_KEYS.SESSIONS, sessions);
  },

  add: (session: Session): void => {
    const sessions = sessionsManager.getAll();
    sessions.push(session);
    sessionsManager.setAll(sessions);
  },

  update: (session: Session): void => {
    const sessions = sessionsManager.getAll();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index !== -1) {
      sessions[index] = session;
      sessionsManager.setAll(sessions);
    }
  },

  delete: (id: number): void => {
    const sessions = sessionsManager.getAll();
    sessionsManager.setAll(sessions.filter(s => s.id !== id));
  },
};

// Events Management
export const eventsManager = {
  getAll: (): Event[] => {
    return getStorageItem(STORAGE_KEYS.EVENTS, []);
  },

  setAll: (events: Event[]): void => {
    setStorageItem(STORAGE_KEYS.EVENTS, events);
  },

  add: (event: Event): void => {
    const events = eventsManager.getAll();
    events.push(event);
    eventsManager.setAll(events);
  },

  update: (event: Event): void => {
    const events = eventsManager.getAll();
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
      eventsManager.setAll(events);
    }
  },

  delete: (id: number): void => {
    const events = eventsManager.getAll();
    eventsManager.setAll(events.filter(e => e.id !== id));
  },
};

// Leadership Management
export const leadershipManager = {
  getAll: (): { president: LeadershipMember | null; executives: LeadershipMember[] } => {
    return getStorageItem(STORAGE_KEYS.LEADERSHIP, { president: null, executives: [] });
  },

  setAll: (data: { president: LeadershipMember | null; executives: LeadershipMember[] }): void => {
    setStorageItem(STORAGE_KEYS.LEADERSHIP, data);
  },

  setPresident: (member: LeadershipMember): void => {
    const data = leadershipManager.getAll();
    data.president = member;
    leadershipManager.setAll(data);
  },

  addExecutive: (member: LeadershipMember): void => {
    const data = leadershipManager.getAll();
    data.executives.push(member);
    leadershipManager.setAll(data);
  },

  updateExecutive: (member: LeadershipMember): void => {
    const data = leadershipManager.getAll();
    const index = data.executives.findIndex(m => m.id === member.id);
    if (index !== -1) {
      data.executives[index] = member;
      leadershipManager.setAll(data);
    }
  },

  deleteExecutive: (id: number): void => {
    const data = leadershipManager.getAll();
    data.executives = data.executives.filter(m => m.id !== id);
    leadershipManager.setAll(data);
  },
};

