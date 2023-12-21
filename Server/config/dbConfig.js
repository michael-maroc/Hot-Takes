import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = mongoose.connect(process.env.SECRET_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connection to MongoDB successful'))
.catch(() => console.log('Fail to connect to MongoDB'))