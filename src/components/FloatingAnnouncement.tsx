import React from 'react';
import { Megaphone } from 'lucide-react';

interface FloatingAnnouncementProps {
    setCurrentPage: (page: string) => void;
}

const FloatingAnnouncement: React.FC<FloatingAnnouncementProps> = ({ setCurrentPage }) => {
    return (
        <button
            onClick={() => setCurrentPage('announcements')}
            className="fixed bottom-6 right-6 z-40 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-lg p-4 transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="View Announcements"
            title="View Announcements"
        >
            <Megaphone className="h-6 w-6" />
        </button>
    );
};

export default FloatingAnnouncement;
