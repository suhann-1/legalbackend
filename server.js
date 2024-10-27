const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Import HTTP module
const { Server } = require('socket.io'); // Import Socket.IO

// Route imports
const clientSignupRoutes = require('./routes/clientsupRoutes'); 
const advocateRoutes = require('./routes/advosupRoutes'); 
const clientLoginRoutes = require('./routes/clientlginRoutes');
const advocateLogin = require('./routes/advocate_login');
const advocateListing = require('./routes/advocateRoutes');
const appointmentRoute = require('./routes/appointmentRoutes');
const clientRoutes = require('./routes/clientRoutes');
const viewappoRoutes = require('./routes/viewappoRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize Socket.IO with the server

// Check if JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set! Using fallback secret for development.');
}
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON data

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// API routes
app.use('/api/client', clientSignupRoutes);
app.use('/api/advocate', advocateRoutes);
app.use('/api/clientlogin', clientLoginRoutes);
app.use('/api/advocateLogin', advocateLogin);
app.use('/api/advocatelist', advocateListing);
app.use('/api/appoinment', appointmentRoute);
app.use('/api/userview', clientRoutes);
app.use('/api/userdlt', clientRoutes);
app.use('/api/viewappo', viewappoRoutes);
app.use('/api/chat', chatRoutes);
// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for incoming messages
  socket.on('sendMessage', (message) => {
    // Emit the message to all connected clients
    io.emit('message', message);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ message: 'An error occurred', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
