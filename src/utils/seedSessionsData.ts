import { sessionsManager, eventsManager, Session, Event } from './dataManager';

export const seedDatabase = async () => {
    if (!confirm('This will add demo data to your database. Continue?')) return;

    try {
        // 1. Upcoming Session
        const upcomingSession: Session = {
            id: 0, // DB will assign
            title: "Advanced Web Development Bootcamp",
            date: "2024-12-20",
            time: "10:00 - 15:00",
            location: "Main Hall",
            description: "Deep dive into modern web frameworks and deployment strategies. Perfect for intermediate developers looking to level up.",
            attendees: 120,
            maxAttendees: 200,
            category: "Web Development",
            flyer: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=1000",
            instructor: "Sarah Connor",
            isPast: false
        };
        await sessionsManager.add(upcomingSession);

        // 2. Event
        const event: Event = {
            id: 0,
            title: "Annual Tech Innovation Summit",
            date: "2024-12-28",
            time: "09:00 - 17:00",
            location: "University Auditorium",
            description: "Join industry leaders and students for a day of inspiring talks, networking, and showcase of innovative projects.",
            attendees: 350,
            maxAttendees: 500,
            category: "Conference",
            flyer: "https://images.unsplash.com/photo-1540575467063-178a50935fd7?auto=format&fit=crop&q=80&w=1000"
        };
        await eventsManager.add(event);

        // 3. Past Sessions
        const pastSessions: Session[] = [
            {
                id: 0,
                title: "A.I And Data Science Session Four",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "A.I And Data Science",
                flyer: "",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/uOT4zKGfHcw?si=sKgOSM05X837V608",
                thumbnail: "/Session four airtificial intelligence.jpg"
            },
            {
                id: 0,
                title: "A.I And Data Science Session Three",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "A.I And Data Science",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/YBuNVi48p-g?si=T39bEdo2Ku6_dR68",
                thumbnail: "/Session three machine learning.jpg"
            },
            {
                id: 0,
                title: "A.I And Data Science Session Two",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "A.I And Data Science",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/XekbkqoOMs0?si=4jKpdkjVnkCCuklm",
                thumbnail: "/Session two data science.jpg"
            },
            {
                id: 0,
                title: "A.I And Data Science Session",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "A.I And Data Science",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/ojh92RelInc?si=-MppKUqxT8S8RhBf",
                thumbnail: "/Session one airtificial intelligence.jpg"
            },
            {
                id: 0,
                title: "Cyber Security Session Three",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Cyber-Security",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/ZucS8dQbcuY?si=LKQKSgkOMJL_EEW3",
                thumbnail: "/Cyber security session three.jpg"
            },
            {
                id: 0,
                title: "Cyber Security Session Two",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Cyber-Security",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/jN3mrKHfhf4?si=0P7V2bvjc5Bvs4u9",
                thumbnail: "public/Cyber security session 2.jpg"
            },
            {
                id: 0,
                title: "Cyber Security Session",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Cyber-Security",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/JDEoeYzmZ4Y?si=jhfxGGV7ow_PkAlq",
                thumbnail: "/Cyber security session one.jpg"
            },
            {
                id: 0,
                title: "Final Digital Marketing Session",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/4c1EeVaqpgM?si=L4wvFeShfgvan-4O",
                thumbnail: "/Digital Marketing last session .jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Seven",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/cAAwRGJX_K0?si=1VKpvaPLes52DL4v",
                thumbnail: "/Digital Marketing session seven .jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Six",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/laadIUMVGyI?si=dugo3lLDZ6bKxmHL",
                thumbnail: "/Digital Marketing session six.jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Five",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/LN6YYqCPgbo?si=_OUGPxjYyx28n1LZ",
                thumbnail: "/Digital Marketing sessionfive continuation.jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Four",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/Pi5MwHtFXaE?si=PZyGZBbydnuAfXpf",
                thumbnail: "/Digital Marketing session four.jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Three",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/xoKXJgUweNE?si=8wItDNm_zYYCVnfC",
                thumbnail: "/Digital Marketing session three.jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session Two",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/TX57-Dmqees?si=c6SM44bB10GBdVtO",
                thumbnail: "/Digital Marketing session two.jpg"
            },
            {
                id: 0,
                title: "Digital Marketing Session",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Digital Marketing",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/2YeV10mZOkc?si=4iExAKuIMQPO-M-2",
                thumbnail: "/Digital Marketing session one.jpg"
            },
            {
                id: 0,
                title: "Final Graphics Session",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Graphics Design",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/7eDgmbZAr7s?si=0mwdO7JjoqXplRBG",
                thumbnail: "/FINAL KYUCSA SESSION.jpg"
            },
            {
                id: 0,
                title: "Graphics Session Four",
                date: "2024-10-20",
                time: "10:00 - 12:00",
                location: "Lab 2",
                description: "Short & Punchy Unlocking the full potential of Canva with some advanced design secrets today. Once you master the hidden tools, the creative possibilities are literally endless.",
                attendees: 30,
                maxAttendees: 50,
                category: "Graphics Design",
                flyer: "",
                instructor: "H.E ZIMULA FARID",
                isPast: true,
                youtubeLink: "https://youtu.be/6vpLf_U9zjA?si=FRgeYJ5BWWfUcvCC",
                thumbnail: "/graphics session 4.jpg" // Matrix code
            },
            {
                id: 0,
                title: "Graphics Session Three",
                date: "2024-10-20",
                time: "10:00 - 12:00",
                location: "Lab 2",
                description: "The Future Vibe Transforming simple prompts into professional graphics with a little AI magic. It’s incredible how these tools can turn a quick thought into a full visual story.",
                attendees: 30,
                maxAttendees: 50,
                category: "Graphics Design",
                flyer: "",
                instructor: "H.E ZIMULA FARID",
                isPast: true,
                youtubeLink: "https://youtu.be/5JJ76NvkH94?si=XnN1mkUwnuuGCIAU",
                thumbnail: "/GRAPHICS SESSION 3.jpg" // Matrix code
            },
            {
                id: 0,
                title: "Graphics Session Two",
                date: "2024-10-20",
                time: "10:00 - 12:00",
                location: "Lab 2",
                description: "The Future Vibe Transforming simple prompts into professional graphics with a little AI magic. It’s incredible how these tools can turn a quick thought into a full visual story.",
                attendees: 30,
                maxAttendees: 50,
                category: "Graphics Design",
                flyer: "",
                instructor: "H.E ZIMULA FARID",
                isPast: true,
                youtubeLink: "https://youtu.be/lBbVG1PhSeo?si=O5o8_0cbiaoR-lyd",
                thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" // Matrix code
            },
            {
                id: 0,
                title: "Graphics Session One",
                date: "2024-11-15",
                time: "14:00 - 16:00",
                location: "Online",
                description: "Back to basics today and finding the beauty in the fundamentals of design. It’s amazing how much you can create in Canva with just the right colors, fonts, and a little imagination.",
                attendees: 45,
                maxAttendees: 100,
                category: "Graphics Design",
                flyer: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                instructor: "John Doe",
                isPast: true,
                youtubeLink: "https://youtu.be/cMKqvAf3qFw?si=GeqrbQvwCotGjuDX",
                thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000" // React bg
            }
        ];

        for (const session of pastSessions) {
            await sessionsManager.add(session);
        }

        alert('Demo data added successfully! The page will reload.');
        window.location.reload();

    } catch (error) {
        console.error('Error seeding data:', error);
        alert('Failed to seed data. Check console.');
    }
};
