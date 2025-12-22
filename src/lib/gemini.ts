
import { supabase } from './supabase';

interface GeminiResponse {
    text: string;
    error?: string;
}

/**
 * Calls the secure Supabase Edge Function to generate text using Gemini.
 * @param prompt The user's input prompt.
 * @param history Optional conversation history (not fully implemented in proxy yet, but ready).
 * @returns The generated text or throws an error.
 */
export async function generateGeminiText(prompt: string, history?: any[]): Promise<string> {

    if (!prompt.trim()) return "";

    try {
        const { data, error } = await supabase.functions.invoke('gemini-proxy', {
            body: { prompt, history },
        });

        if (error) {
            console.error('Supabase Function Error:', error);
            throw new Error(error.message || 'Failed to invoke function');
        }

        if (data?.error) {
            console.error('Gemini Proxy Error:', data.error);
            throw new Error(data.error);
        }

        return data?.text || "";

    } catch (err: any) {
        console.error('Error generating text:', err);
        throw err;
    }
}
