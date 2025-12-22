
import React, { useState } from 'react';
import { generateGeminiText } from '../lib/gemini';
import { Send, Loader2, Sparkles } from 'lucide-react';

const GeminiTest = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError('');
        setResponse('');

        try {
            const text = await generateGeminiText(prompt);
            setResponse(text);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 my-8">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-800">Gemini AI Test</h2>
            </div>

            <form onSubmit={handleGenerate} className="mb-6">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask something..."
                        className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none h-32"
                    />
                    <button
                        type="submit"
                        disabled={loading || !prompt.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
            </form>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 mb-4">
                    Error: {error}
                </div>
            )}

            {response && (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Response</h3>
                    <div className="prose prose-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {response}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeminiTest;
