// File: backend/index.js  
const express = require('express');  
const cors = require('cors');  
const { sql } = require('@vercel/postgres');  
const { educationHistory, skills, projects } = require('./data');  
const app = express();  
app.use(cors());  
app.use(express.json());  
// API endpoints  
app.get('/api/education', async (req, res) => {  
try {  
// Jika ingin ambil dari database Neon:  
const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;  
res.json(rows);  
// Jika ingin ambil dari file data.js:  
// res.json(educationHistory);  
} catch (error) {  
res.status(500).json({ error: 'Gagal mengambil data pendidikan' });  
}  
});  
app.get('/api/skills', async (req, res) => {  
try {  
const { rows } = await sql`SELECT * FROM skills;`;  
res.json(rows);  
// res.json(skills);  
} catch (error) {  
res.status(500).json({ error: 'Gagal mengambil data skills' }); 
}  
});  
app.get('/api/projects', async (req, res) => {  
try {  
const { rows } = await sql`SELECT * FROM projects;`;  
res.json(rows);  
// res.json(projects);  
} catch (error) {  
res.status(500).json({ error: 'Gagal mengambil data projects' });  }  
});  
// Export handler for Vercel  
module.exports = app;