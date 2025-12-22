import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MessageProps {
    role: 'dean' | 'hod' | 'patron';
    title: string;
    defaultName: string;
    defaultImage: string;
    defaultMessage: string;
}

interface MessageData {
    name: string;
    image: string;
    message: string;
    email?: string;
}

const LeadershipMessage: React.FC<MessageProps> = ({ role, title, defaultName, defaultImage, defaultMessage }) => {
    const [data, setData] = useState<MessageData>({
        name: defaultName,
        image: defaultImage,
        message: defaultMessage
    });
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        loadMessage();
    }, [role]);

    const loadMessage = async () => {
        try {
            // leveraging a 'official_messages' table or similar. 
            // For now, to keep it simple without migration, I'll simulate or use a new table if exists.
            // Since I can't easily create tables without SQL access (I have Supabase client but not direct SQL console usually, unless I use SQL tool if available, but I don't have one).
            // Wait, I migrated authManager. I can do CRUD.
            // I will assume a 'official_messages' table exists or I will create one/use 'president_message' and add a 'role' column?
            // actually, 'president_message' table structure was: id, name, title, image, message.
            // I can abuse it by adding more rows? But ID is integer.
            // Let's assume I'll use a new table 'official_messages' or just hardcode for now + localStorage/Supabase if I can.
            // Given user constraints, I'll stick to a simple consistent pattern.
            // Let's try to fetch by role from a 'official_messages' table. If it errors, fall back to defaults.

            const { data: dbData, error } = await supabase
                .from('official_messages')
                .select('*')
                .eq('role', role)
                .single();

            if (dbData) {
                setData({
                    name: dbData.name,
                    image: dbData.image,
                    message: dbData.message,
                    email: dbData.email
                });
            }
        } catch (error) {
            console.error(`Error loading ${role} message:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-primary-500 text-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        {title}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <div className="bg-white border-2 border-primary-200 rounded-2xl overflow-hidden shadow-xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start p-6 sm:p-8">
                        {/* Text Column (First on Desktop, Second on Mobile) */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                                {title}
                            </h2>
                            <div className={`space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base relative ${isExpanded ? '' : 'max-h-[450px] overflow-hidden'}`}>
                                {data.message.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}

                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                )}
                            </div>

                            {data.message.split('\n').length > 1 && (
                                <div className="mt-6 flex justify-center lg:justify-start">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                    >
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Image Column (First on Mobile, Second on Desktop) */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[3/4] bg-gray-200 overflow-hidden rounded-xl shadow-lg max-w-sm mx-auto">
                                <img
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
                                <p className="text-primary-500 font-semibold">{title}</p>
                                {data.email && (
                                    <div className="flex items-center justify-center mt-3 text-gray-600">
                                        <Mail className="h-4 w-4 mr-2" />
                                        <a href={`mailto:${data.email}`} className="hover:text-primary-500 transition-colors text-sm">
                                            {data.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadershipMessage;
