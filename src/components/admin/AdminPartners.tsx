import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { partnersManager, Partner } from '../../utils/dataManager';
import { seedPartnersDatabase } from '../../utils/seedPartnersData';

const AdminPartners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [activeTab, setActiveTab] = useState<'home' | 'corporate'>('home');
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<Partial<Partner>>({
        name: '',
        logo: '',
        category: 'home',
        description: ''
    });

    useEffect(() => {
        loadPartners();
    }, []);

    const loadPartners = async () => {
        const data = await partnersManager.getAll();
        setPartners(data);
    };

    const currentPartners = partners.filter(p => p.category === activeTab);

    const handleAdd = () => {
        setFormData({
            name: '',
            logo: '',
            category: activeTab,
            description: ''
        });
        setEditingPartner(null);
        setSelectedFile(null);
        setShowForm(true);
    };

    const handleEdit = (partner: Partner) => {
        setFormData(partner);
        setEditingPartner(partner);
        setSelectedFile(null);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            await partnersManager.delete(id);
            await loadPartners();
        }
    };

    const handleSave = async () => {
        if (!formData.name) {
            alert("Please enter a partner name.");
            return;
        }
        setUploading(true);

        try {
            let logoUrl = formData.logo;

            if (selectedFile) {
                logoUrl = await partnersManager.uploadPartnerLogo(selectedFile);
            }

            const partnerData: Partner = {
                id: editingPartner?.id || Date.now(),
                name: formData.name!,
                logo: logoUrl || 'https://via.placeholder.com/150',
                category: activeTab,
                description: formData.description
            };

            if (editingPartner) {
                await partnersManager.update(partnerData);
            } else {
                await partnersManager.add(partnerData);
            }

            await loadPartners();
            setShowForm(false);
            setEditingPartner(null);
            setSelectedFile(null);
        } catch (error: any) {
            console.error("Failed to save partner:", error);
            alert(`Failed to save partner: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
                    <p className="text-gray-600">Manage partners displayed on Home and About Us pages</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => seedPartnersDatabase()}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Restore Defaults
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add Partner
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'home'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Home Page Partners
                </button>
                <button
                    onClick={() => setActiveTab('corporate')}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'corporate'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Corporate Partners (About Us)
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">{editingPartner ? 'Edit Partner' : 'Add New Partner'}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.logo}
                                    onChange={e => setFormData({ ...formData, logo: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="https://..."
                                />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-gray-500" />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setSelectedFile(file);
                                            // Preview
                                            const reader = new FileReader();
                                            reader.onloadend = () => setFormData({ ...formData, logo: reader.result as string });
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                </label>
                            </div>
                            {formData.logo && <img src={formData.logo} alt="Preview" className="mt-2 h-16 object-contain border border-gray-200 p-1 rounded" />}

                        </div>
                        {activeTab === 'corporate' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    rows={3}
                                />
                            </div>
                        )}
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowForm(false)} disabled={uploading} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                            <button onClick={handleSave} disabled={uploading} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50">
                                {uploading ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPartners.map(partner => (
                    <div key={partner.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center gap-4">
                        <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain border border-gray-100 rounded bg-gray-50" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{partner.name}</h4>
                            {partner.description && <p className="text-xs text-gray-500 line-clamp-2">{partner.description}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(partner)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(partner.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
                {currentPartners.length === 0 && (
                    <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        No partners found in this section.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPartners;
