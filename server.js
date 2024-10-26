const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const clientSignupRoutes = require('./routes/clientsupRoutes'); 
const advocateRoutes = require('./routes/advosupRoutes'); 
const clientLoginRoutes = require('./routes/clientlginRoutes');
const advocateLogin = require('./routes/advocate_login');
const advocateListing = require('./routes/advocateRoutes');
const appoinmentroute=require('./routes/appointmentRoutes');
const clientRoutes=require('./routes/clientRoutes');




dotenv.config(); // Load environment variables

const app = express();


// Check if JWT_SECRET is set (better for production security)
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set! Using fallback secret for development.');
}
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON data


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });




app.use('/api/client', clientSignupRoutes);
app.use('/api/advocate', advocateRoutes);
app.use('/api/clientlogin', clientLoginRoutes);
app.use('/api/advocateLogin', advocateLogin);
app.use('/api/advocatelist', advocateListing);
app.use('/api/appoinment',appoinmentroute);
app.use('/api/userview',clientRoutes);
app.use('/api/userdlt',clientRoutes);




app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ message: 'An error occurred', error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
