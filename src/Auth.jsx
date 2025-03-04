// src/utils/auth.js
import supabase from '../src/supabase'; // Import your Supabase client

// Function to get and refresh the auth token
export const getAuthToken = async () => {
  // Get the current session from Supabase
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return session.access_token; // Return the current access token if valid
  }

  // If no session, try refreshing it
  console.log('Access token expired, attempting refresh...');

  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    console.error('Token refresh failed:', error.message);
    return null;
  }

  return data.session?.access_token || null;
};
