import { supabase } from './supabase.js';

async function testConnection() {
  console.log('Starting Supabase connection test...');
  console.log('Environment variables:');
  console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
  console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');

  try {
    console.log('\nTesting database connection...');
    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .limit(1);

    if (error) throw error;

    console.log('Successfully connected to Supabase!');
    console.log('Test query result:', data);
    process.exit(0);
  } catch (error: any) {
    console.error('\nError details:');
    if (error?.error instanceof Error) {
      console.error('- Name:', error.error.name);
      console.error('- Message:', error.error.message);
    } else {
      console.error('- Error:', error);
    }
    process.exit(1);
  }
}

console.log('Test script started');
testConnection().catch(error => {
  console.error('Unhandled error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
}); 