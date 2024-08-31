// Função auxiliar para chamadas ao Supabase
export const fetchFromSupabase = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_KEY || '',
      Authorization: `Bearer ${process.env.SUPABASE_KEY || ''}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Error fetching data from Supabase');
  }

  return response.json();
};
