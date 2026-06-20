// config.js — Configurazione API BrevettIAmo
// La chiave Groq NON è più qui — è sicura nel proxy Supabase

const CONFIG = {
    // URL proxy testo (Groq)
    PROXY_URL: 'https://jtekrvlmqnluvaiapmwb.supabase.co/functions/v1/groq-proxy',
    
    // NUOVO: URL proxy immagini (DALL-E 3)
    IMAGE_PROXY_URL: 'https://jtekrvlmqnluvaiapmwb.supabase.co/functions/v1/image-proxy',
    
    // Modelli disponibili (aggiornati giugno 2026)
    MODELLI: {
        testo: 'llama-3.3-70b-versatile',
        visione: 'llava-v1.5-7b-4096-preview',
        rapido: 'mixtral-8x7b-32768',
        bilanciato: 'llama-3.1-8b-instant'
    },
    
    // Parametri default
    DEFAULT_TEMPERATURE: 0.7,
    DEFAULT_MAX_TOKENS: 4000,
    
    // Timeout e retry
    TIMEOUT_MS: 30000,
    MAX_RETRY: 2
};

if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
