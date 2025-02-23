import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://user:SDS845Hkjasd83Hjkasd773hsakGFDASKJF787w4r@ec2-13-61-32-130.eu-north-1.compute.amazonaws.com:51252/json_diff'
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;