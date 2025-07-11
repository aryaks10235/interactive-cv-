const express = require('express');  
const cors = require('cors');  
const { sql } = require('@vercel/postgres');  
const { educationHistory, skills, projects } = require('./data');  

const app = express();  
app.use(cors());  
app.use(express.json());  

// Root endpoint untuk backend
app.get('/', (req, res) => {
  res.json({ 
    message: 'Personal Web Backend API', 
    version: '1.0.0',
    endpoints: {
      education: '/api/education',
      skills: '/api/skills', 
      projects: '/api/projects'
    }
  });
});

// API endpoints  
app.get('/api/education', async (req, res) => {  
  try {  
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;  
    res.json(rows);  
  } catch (error) {  
    console.error('Error fetching education:', error);
    res.status(500).json({ error: 'Gagal mengambil data pendidikan' });  
  }  
});  

app.get('/api/skills', async (req, res) => {  
  try {  
    const { rows } = await sql`SELECT * FROM skills;`;  
    res.json(rows);  
  } catch (error) {  
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Gagal mengambil data skills' }); 
  }  
});  

app.get('/api/projects', async (req, res) => {  
  try {  
    const { rows } = await sql`SELECT * FROM projects;`;  
    res.json(rows);  
  } catch (error) {  
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Gagal mengambil data projects' });  
  }  
});  

// Export handler for Vercel  
module.exports = app;