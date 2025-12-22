import { projectsManager, Project } from './dataManager';

export const seedProjectsDatabase = async () => {
    if (!confirm('This will add demo projects to your database. Continue?')) return;

    try {
        const defaultProjects: Project[] = [
            {
                id: 0,
                title: 'Hostel Connect',
                description: 'Hostel Connect is a web application that helps students find and book hostels and rentals of their choice and preferences around different locations in their universities all over the country.',
                category: 'web',
                technologies: ['TypeScriptJSX', 'Node.js', 'Express.js'],
                author: 'Bangole Alvin, Zimula Farid and Ladu David',
                year: '2025',
                stars: 45,
                views: 1200,
                collaborators: 2,
                image: '/Hostel Connect logo.jpg',
                projectUrl: 'https://www.hostelconnect.online/'
            },
            {
                id: 0,
                title: 'Flamia',
                description: 'Flamia is an e-commerce platform that helps .',
                category: 'web',
                technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
                author: 'Bangole Alvin, Zimula Farid and Ladu David',
                year: '2025',
                stars: 67,
                views: 890,
                collaborators: 3,
                image: '/FLAMIA LOGO.png',
                projectUrl: 'https://flamia.store/'
            },
            {
                id: 0,
                title: 'Flamia Mobile App',
                description: 'Flutter mobile app for navigating Kyambogo University campus with AR features.',
                category: 'mobile',
                technologies: ['React Native', 'TypeScriptJSX', 'Supabase'],
                author: 'Ladu David, Bangole Alvin and Zimula Farid',
                year: '2025',
                stars: 32,
                views: 756,
                collaborators: 2,
                image: '/FLAMIA LOGO.png',
                projectUrl: 'https://play.google.com/store/search?q=flamia&c=apps&hl=en'
            },
            {
                id: 0,
                title: 'Tamu Store',
                description: 'An ecommerce store that will be dealing in computers and its realated accessories that are rare on the market',
                category: 'web',
                technologies: ['Java', 'JavaFX', 'MySQL', 'Scene Builder'],
                author: 'Zimula Farid and Bangole Alvin',
                year: '2025',
                stars: 28,
                views: 634,
                collaborators: 1,
                image: '/Tamu Store Lopgo.png',
                projectUrl: '#'
            }
        ];

        for (const project of defaultProjects) {
            await projectsManager.add(project);
        }

        alert('Projects restored successfully! The page will reload.');
        window.location.reload();

    } catch (error) {
        console.error('Error seeding projects:', error);
        alert('Failed to seed projects. Check console.');
    }
};
