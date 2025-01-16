const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./config/connectDb.js');
dotenv.config();


connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', require('./routes/user'));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
} ); 