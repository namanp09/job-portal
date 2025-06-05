import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

await connectDB()
await connectCloudinary()

// Debug logger to check if requests are hitting the server
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Routes
app.get('/', (req, res) => {
  res.send('API Working');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
}); 

app.post('/webhooks', clerkWebhooks)

app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)


// Port
const PORT = process.env.PORT || 5001;
Sentry.setupExpressErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});