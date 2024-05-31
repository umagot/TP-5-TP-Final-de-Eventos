//ESTA MAL



/*import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getAllProvinces = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM provinces');
    return result.rows;
  } finally {
    client.release();
  }
};

const getProvinceById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM provinces WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const createProvince = async (province) => {
  const client = await pool.connect();
  try {
    const { name, full_name, latitude, longitude, display_order } = province;
    const result = await client.query(
      'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, full_name, latitude, longitude, display_order]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateProvince = async (province) => {
  const client = await pool.connect();
  try {
    const { id, name, full_name, latitude, longitude, display_order } = province;
    const result = await client.query(
      'UPDATE provinces SET name = $2, full_name = $3, latitude = $4, longitude = $5, display_order = $6 WHERE id = $1 RETURNING *',
      [id, name, full_name, latitude, longitude, display_order]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteProvince = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM provinces WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export { getAllProvinces, getProvinceById, createProvince, updateProvince, deleteProvince };
*/

