import React, { useState, useEffect } from 'react';
import { Save, FileText, Upload } from 'lucide-react';
import { settingsManager } from '../../utils/dataManager';

const AdminSettings: React.FC = () => {
    const [workPlanUrl, setWorkPlanUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const url = await settingsManager.get('work_plan_url');
        if (url) setWorkPlanUrl(url);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await settingsManager.set('work_plan_url', workPlanUrl);
        setLoading(false);
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">General Settings</h2>
                <p className="text-gray-600">Manage global website configurations</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary-500" />
                            Work Plan Document
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Work Plan URL / PDF Link
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={workPlanUrl}
                                        onChange={(e) => setWorkPlanUrl(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        placeholder="https://example.com/workplan.pdf"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Upload your PDF to a cloud storage (like Google Drive publicly, or Supabase Storage if configured) and paste the link here.
                                    Or use the upload button below to convert a local file to a data URL (suitable for small files).
                                </p>
                            </div>

                            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
                                <label className="cursor-pointer flex flex-col items-center gap-2 text-primary-600 hover:text-primary-700">
                                    <Upload className="h-8 w-8" />
                                    <span className="font-medium">Upload PDF File</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 5 * 1024 * 1024) {
                                                    alert("File is too large (max 5MB for direct upload). Please host it externally and provide the URL.");
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onloadend = () => setWorkPlanUrl(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                                <p className="text-xs text-gray-400 mt-2">Max 5MB for direct uploads</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
