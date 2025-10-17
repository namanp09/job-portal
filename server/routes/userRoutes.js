import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, matchResume, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router = express.Router()

// Get user Data
router.get('/user', getUserData)

// Apply for a job
router.post('/apply', applyForJob)

// Get applied jobs data
router.get('/applications', getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

// Match resume with job description
router.post('/match-resume', matchResume)

export default router