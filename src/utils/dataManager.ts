
import { supabase } from '../lib/supabase';

// Intefaces
export interface Note {
  id: number;
  name: string;
  type: string;
  size: string;
  downloads: number;
  category: 'bitc' | 'bis' | 'blis' | 'cs';
  year: 'year1' | 'year2' | 'year3';
  semester?: 'semester1' | 'semester2';
  url?: string;
  fileData?: string; // We will store this in 'file_data' column
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
  youtubeLink?: string;
  thumbnail?: string;
  isPast?: boolean;
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
  linkedin?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  category: 'home' | 'corporate';
  description?: string;
}

export interface PresidentMessage {
  id?: number;
  name: string;
  title: string;
  image: string;
  message: string;
}

export interface Announcement {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  link: string;
}

// --- Auth Manager ---
export const authManager = {
  login: async (email: string, password: string): Promise<boolean> => {
    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      console.error('Login failed:', error);
      return false;
    }

    // Store simple session flag in local storage for UI state persistence
    // Supabase handles the actual token persistence automatically
    localStorage.setItem('kyucsa_auth_user', JSON.stringify({ email: data.user.email }));
    return true;
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
    localStorage.removeItem('kyucsa_auth_user');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('kyucsa_auth_user');
  }
};

// --- Notes Manager ---
export const notesManager = {
  getAll: async (): Promise<Record<string, Record<string, Note[]>>> => {
    const { data, error } = await supabase.from('notes').select('*');
    if (error) {
      console.error('Error fetching notes:', error);
      return { bitc: { year1: [], year2: [], year3: [] }, bis: { year1: [], year2: [], year3: [] }, blis: { year1: [], year2: [], year3: [] }, cs: { year1: [], year2: [], year3: [] } };
    }

    // Reconstruct the nested structure expected by the UI
    const result: Record<string, Record<string, Note[]>> = {
      bitc: { year1: [], year2: [], year3: [] },
      bis: { year1: [], year2: [], year3: [] },
      blis: { year1: [], year2: [], year3: [] },
      cs: { year1: [], year2: [], year3: [] },
    };

    data.forEach((item: any) => {
      const note: Note = {
        id: item.id,
        name: item.name,
        type: item.type,
        size: item.size,
        downloads: item.downloads,
        category: item.category as any,
        year: item.year as any,
        semester: item.semester,
        url: item.url,
        fileData: item.file_data
      };

      if (result[note.category] && result[note.category][note.year]) {
        result[note.category][note.year].push(note);
      }
    });

    return result;
  },

  add: async (note: Note): Promise<void> => {
    const dbNote = {
      name: note.name,
      type: note.type,
      size: note.size,
      downloads: note.downloads,
      category: note.category,
      year: note.year,
      semester: note.semester, // Ensure this column exists or ignore if not needed
      url: note.url,
      file_data: note.fileData
    };
    const { error } = await supabase.from('notes').insert([dbNote]);
    if (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  update: async (note: Note): Promise<void> => {
    const dbNote = {
      name: note.name,
      type: note.type,
      size: note.size,
      downloads: note.downloads,
      category: note.category,
      year: note.year,
      url: note.url,
      file_data: note.fileData
    };
    const { error } = await supabase.from('notes').update(dbNote).eq('id', note.id);
    if (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};

// --- Projects Manager ---
export const projectsManager = {
  getAll: async (): Promise<Project[]> => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      technologies: item.technologies || [],
      author: item.author,
      year: item.year,
      stars: item.stars,
      views: item.views,
      collaborators: item.collaborators,
      image: item.image,
      projectUrl: item.project_url
    }));
  },

  add: async (project: Project): Promise<void> => {
    const dbProject = {
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies,
      author: project.author,
      year: project.year,
      stars: project.stars,
      views: project.views,
      collaborators: project.collaborators,
      image: project.image,
      project_url: project.projectUrl
    };
    await supabase.from('projects').insert([dbProject]);
  },

  update: async (project: Project): Promise<void> => {
    const dbProject = {
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies,
      author: project.author,
      year: project.year,
      stars: project.stars,
      views: project.views,
      collaborators: project.collaborators,
      image: project.image,
      project_url: project.projectUrl
    };
    await supabase.from('projects').update(dbProject).eq('id', project.id);
  },

  delete: async (id: number): Promise<void> => {
    await supabase.from('projects').delete().eq('id', id);
  }
};

// --- Sessions Manager ---
export const sessionsManager = {
  getAll: async (): Promise<Session[]> => {
    const { data, error } = await supabase.from('sessions').select('*').order('created_at', { ascending: false });
    if (error) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      location: item.location,
      description: item.description,
      attendees: item.attendees,
      maxAttendees: item.max_attendees,
      category: item.category,
      flyer: item.flyer,
      instructor: item.instructor,
      youtubeLink: item.youtube_link,
      thumbnail: item.thumbnail,
      isPast: item.is_past
    }));
  },

  add: async (session: Session): Promise<void> => {
    const dbSession = {
      title: session.title,
      date: session.date,
      time: session.time,
      location: session.location,
      description: session.description,
      attendees: session.attendees,
      max_attendees: session.maxAttendees,
      category: session.category,
      flyer: session.flyer,
      instructor: session.instructor,
      youtube_link: session.youtubeLink,
      thumbnail: session.thumbnail,
      is_past: session.isPast
    };
    await supabase.from('sessions').insert([dbSession]);
  },

  update: async (session: Session): Promise<void> => {
    const dbSession = {
      title: session.title,
      date: session.date,
      time: session.time,
      location: session.location,
      description: session.description,
      attendees: session.attendees,
      max_attendees: session.maxAttendees,
      category: session.category,
      flyer: session.flyer,
      instructor: session.instructor,
      youtube_link: session.youtubeLink,
      thumbnail: session.thumbnail,
      is_past: session.isPast
    };
    await supabase.from('sessions').update(dbSession).eq('id', session.id);
  },

  delete: async (id: number): Promise<void> => {
    await supabase.from('sessions').delete().eq('id', id);
  }
};

// --- Events Manager ---
// Merged into sessions table often, but if separate table kept:
export const eventsManager = {
  getAll: async (): Promise<Event[]> => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      location: item.location,
      description: item.description,
      attendees: item.attendees,
      maxAttendees: item.max_attendees,
      category: item.category,
      flyer: item.flyer
    }));
  },

  add: async (event: Event): Promise<void> => {
    const dbEvent = {
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      attendees: event.attendees,
      max_attendees: event.maxAttendees,
      category: event.category,
      flyer: event.flyer
    };
    await supabase.from('events').insert([dbEvent]);
  },

  update: async (event: Event): Promise<void> => {
    const dbEvent = {
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      attendees: event.attendees,
      max_attendees: event.maxAttendees,
      category: event.category,
      flyer: event.flyer
    };
    await supabase.from('events').update(dbEvent).eq('id', event.id);
  },

  delete: async (id: number): Promise<void> => {
    await supabase.from('events').delete().eq('id', id);
  }
};

// --- Leadership Manager ---
export const leadershipManager = {
  getAll: async (): Promise<Record<string, { president: LeadershipMember | null; executives: LeadershipMember[] }>> => {
    const { data, error } = await supabase.from('leadership').select('*');
    if (error) return {};

    const result: Record<string, { president: LeadershipMember | null; executives: LeadershipMember[] }> = {};

    data.forEach((item: any) => {
      const year = item.year || '2024';
      if (!result[year]) {
        result[year] = { president: null, executives: [] };
      }

      const member: LeadershipMember = {
        id: item.id,
        name: item.name,
        position: item.position,
        year: item.year,
        course: item.course,
        bio: item.bio,
        email: item.email,
        image: item.image,
        achievements: item.achievements || [],
        linkedin: item.linkedin
      };

      if (item.is_president) {
        result[year].president = member;
      } else {
        result[year].executives.push(member);
      }
    });

    return result;
  },

  addExecutive: async (member: LeadershipMember): Promise<void> => {
    const dbMember = {
      name: member.name,
      position: member.position,
      year: member.year,
      course: member.course,
      bio: member.bio,
      email: member.email,
      image: member.image,
      achievements: member.achievements,
      linkedin: member.linkedin,
      is_president: false
    };
    await supabase.from('leadership').insert([dbMember]);
  },

  setPresident: async (member: LeadershipMember): Promise<void> => {
    // First check if a president exists for this year, if so update, else insert
    // For simplicity, just insert/update based on ID if present or just insert
    const dbMember = {
      name: member.name,
      position: member.position,
      year: member.year,
      course: member.course,
      bio: member.bio,
      email: member.email,
      image: member.image,
      achievements: member.achievements,
      linkedin: member.linkedin,
      is_president: true
    };

    if (member.id && member.id < 1000000000000) { // Check if it's a real ID or timestamp
      await supabase.from('leadership').update(dbMember).eq('id', member.id);
    } else {
      await supabase.from('leadership').insert([dbMember]);
    }
  },

  updateExecutive: async (member: LeadershipMember): Promise<void> => {
    const dbMember = {
      name: member.name,
      position: member.position,
      year: member.year,
      course: member.course,
      bio: member.bio,
      email: member.email,
      image: member.image,
      achievements: member.achievements,
      linkedin: member.linkedin,
      is_president: false // Assuming update executive keeps them as executive
    };
    await supabase.from('leadership').update(dbMember).eq('id', member.id);
  },

  deleteExecutive: async (id: number): Promise<void> => {
    await supabase.from('leadership').delete().eq('id', id);
  }
};

// --- Partners Manager ---
export const partnersManager = {
  getAll: async (): Promise<Partner[]> => {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) return [];

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      logo: item.logo,
      category: item.category as any,
      description: item.description
    }));
  },

  add: async (partner: Partner): Promise<void> => {
    const dbPartner = {
      name: partner.name,
      logo: partner.logo,
      category: partner.category,
      description: partner.description
    };
    await supabase.from('partners').insert([dbPartner]);
  },

  update: async (partner: Partner): Promise<void> => {
    const dbPartner = {
      name: partner.name,
      logo: partner.logo,
      category: partner.category,
      description: partner.description
    };
    await supabase.from('partners').update(dbPartner).eq('id', partner.id);
  },

  delete: async (id: number): Promise<void> => {
    await supabase.from('partners').delete().eq('id', id);
  }
};

// --- President Message Manager ---
export const presidentMessageManager = {
  get: async (): Promise<PresidentMessage> => {
    const { data, error } = await supabase.from('president_message').select('*').single();
    if (error || !data) {
      return {
        id: 0,
        name: 'H.E. JOHN DOE',
        title: 'President, KYUCSA',
        image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        message: 'Welcome to the Kyambogo University Computer Science Association (KYUCSA). We are a community of passionate individuals dedicated to excellence in technology and leadership.',
      };
    }
    return {
      id: data.id,
      name: data.name,
      title: data.title,
      image: data.image,
      message: data.message
    };
  },

  set: async (message: PresidentMessage): Promise<void> => {
    const dbMessage = {
      name: message.name,
      title: message.title,
      image: message.image,
      message: message.message
    };

    // Assuming single row with ID=1 or just always update the first
    if (message.id) {
      await supabase.from('president_message').update(dbMessage).eq('id', message.id);
    } else {
      // Try updating ID 1 or insert
      const { error } = await supabase.from('president_message').update(dbMessage).eq('id', 1);
      if (error) await supabase.from('president_message').insert([dbMessage]);
    }
  }
};

// --- Announcements Manager ---
export const announcementsManager = {
  getAll: async (): Promise<Announcement[]> => {
    const { data, error } = await supabase.from('announcements').select('*').order('date', { ascending: false });
    if (error) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
      link: item.link
    }));
  },

  add: async (announcement: Announcement): Promise<void> => {
    const dbAnnouncement = {
      title: announcement.title,
      category: announcement.category,
      date: announcement.date,
      description: announcement.description,
      link: announcement.link
    };
    await supabase.from('announcements').insert([dbAnnouncement]);
  },

  update: async (announcement: Announcement): Promise<void> => {
    const dbAnnouncement = {
      title: announcement.title,
      category: announcement.category,
      date: announcement.date,
      description: announcement.description,
      link: announcement.link
    };
    await supabase.from('announcements').update(dbAnnouncement).eq('id', announcement.id);
  },

  delete: async (id: number): Promise<void> => {
    await supabase.from('announcements').delete().eq('id', id);
  }
};
// --- Settings Manager ---
export interface Setting {
  key: string;
  value: string;
}

export const settingsManager = {
  get: async (key: string): Promise<string | null> => {
    const { data, error } = await supabase.from('settings').select('value').eq('key', key).single();
    if (error || !data) return null;
    return data.value;
  },

  set: async (key: string, value: string): Promise<void> => {
    const { error } = await supabase.from('settings').upsert({ key, value });
    if (error) console.error('Error saving setting:', error);
  }
};
