const express = require('expres\s');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); //loads env variables from .env to process.env
dotenv.config(); //calls the config() method from dotenv package, makes all variables accessible via process.env.VARIABLE_NAME

const app = express();
const PORT  = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload',uploadRoutes);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MONGODB Connected'))
.catch(err => console.log('MONGODB connection error:',err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


