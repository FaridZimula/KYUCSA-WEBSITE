import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { announcementsManager, Announcement } from '../utils/dataManager';

const Announcements = () => {
    const [filter, setFilter] = useState('All');
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await announcementsManager.getAll();
            setAnnouncements(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const categories = ['All', 'General', 'Job Opportunity', 'Event', 'Academic'];

    const filteredAnnouncements = filter === 'All'
        ? announcements
        : announcements.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-primary-900 text-white py-16 sm:py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Announcements & News
                    </h1>
                    <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto">
                        Stay informed with the latest updates, opportunities, and news from KYUCSA.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                {/* Category Filter */}
                <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-hide gap-3 mb-10 pb-2 px-2 sm:justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0
                                ${filter === cat
                                    ? 'bg-primary-500 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:scale-105'}`}
                        >
                            {cat === 'Job Opportunity' ? 'Job Opportunities' : cat === 'Academic' ? 'Academics' : cat === 'Event' ? 'Events' : cat}
                        </button>
                    ))}
                </div>

                {/* Announcements List */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading announcements...</div>
                ) : filteredAnnouncements.length === 0 ? (
                    <div className="text-center py-20 bg-primary-500 rounded-xl shadow-sm border border-primary-400">
                        <p className="text-lg font-medium text-white mb-2">No announcements found</p>
                        <p className="text-sm sm:text-base text-blue-100">Try selecting a different category.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {filteredAnnouncements.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white`}
                                                >
                                                    {item.category}
                                                </span>
                                                <span className="flex items-center text-xs text-gray-500">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {new Date(item.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {item.link && (
                                        <div className="flex justify-start">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;
