import express from 'express';
import dbCon from './utils/db.js';
import cors from 'cors';
import routers from './routes/routes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize dotenv
dotenv.config();

// Create Express app
const app = express();

// MongoDB connection
dbCon();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', routers);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve React's index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const fport = process.env.PORT || 3000;
app.listen(fport, () => {
    console.log(`Server is running on port ${fport}`);
});
