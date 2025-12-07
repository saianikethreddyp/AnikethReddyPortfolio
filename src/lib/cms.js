const SUPABASE_URL = 'https://mkojcietzlacpulogtfe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rb2pjaWV0emxhY3B1bG9ndGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjI2MjAsImV4cCI6MjA4MDY5ODYyMH0.8fIDecpQ30iC75XuzaKnpXKFeKJ5bIqGJxZXpx-pEHU';

const fetchFromSupabase = async (endpoint) => {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`Supabase fetch error: ${response.statusText}`);
    }

    return await response.json();
};

export const getArticles = async () => {
    try {
        // Equivalent to: .from('articles').select('*').eq('published', true).order('created_at', { ascending: false })
        // Order syntax in REST: &order=created_at.desc
        const data = await fetchFromSupabase('articles?select=*&published=eq.true&order=created_at.desc');
        return data || [];
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}

export const getArticleBySlug = async (slug) => {
    try {
        // Equivalent to: .from('articles').select('*').eq('slug', slug).single()
        // Single implies we expect one, REST returns array unless we use headers or handled by client logic.
        // But common REST practice here is just filtering.
        // We can use limit=1.
        // Supabase REST single object return requires specific header 'Accept: application/vnd.pgrst.object+json' usually,
        // or we just take the first item of the array.

        const data = await fetchFromSupabase(`articles?select=*&slug=eq.${slug}&limit=1`);
        return data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}
