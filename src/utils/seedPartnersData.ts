import { partnersManager, Partner } from './dataManager';

export const seedPartners = async (silent = false) => {
    try {
        const homePartners: Partner[] = [
            { id: 0, name: 'Tech Company 1', logo: '/Hostel Connect logo.jpg', category: 'home' },
            { id: 0, name: 'Tech Company 2', logo: '/FLAMIA LOGO.png', category: 'home' },
            { id: 0, name: 'Tech Company 3', logo: '/Tamu Graphics.png', category: 'home' },
            { id: 0, name: 'Tech Company 4', logo: '/Tamu Store Lopgo.png', category: 'home' },
            { id: 0, name: 'Tech Company 5', logo: '/Tamu Web Logo 2.png', category: 'home' },
            { id: 0, name: 'Tech Company 6', logo: '/KYU LOGO 3.png', category: 'home' },
            { id: 0, name: 'Tech Company 3', logo: '/1719928495036.jpeg', category: 'home' },
            { id: 0, name: 'Tech Company 4', logo: '/download (8).png', category: 'home' },
            { id: 0, name: 'Tech Company 5', logo: '/download (39).jpeg', category: 'home' },
            { id: 0, name: 'Tech Company 6', logo: '/Policy.jpg', category: 'home' },
        ];

        const corporatePartners: Partner[] = [
            {
                id: 0,
                name: 'Microsoft',
                logo: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=200',
                category: 'corporate',
                description: 'Technology partnership for student development programs'
            },
            {
                id: 0,
                name: 'Oracle',
                logo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
                category: 'corporate',
                description: 'Database management and enterprise software training'
            }
        ];

        for (const p of homePartners) {
            await partnersManager.add(p);
        }
        for (const p of corporatePartners) {
            await partnersManager.add(p);
        }

        if (!silent) {
            alert('Partners restored successfully! The page will reload.');
            window.location.reload();
        }

    } catch (error) {
        console.error('Error seeding partners:', error);
        if (!silent) {
            alert('Failed to seed partners. Check console.');
        }
    }
};

export const seedPartnersDatabase = async () => {
    if (!confirm('This will add default partners to your database. Continue?')) return;
    await seedPartners(false);
};
