import JobApplication from "../models/JobApplications.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import {v2 as cloudinary} from 'cloudinary'
import { GoogleGenerativeAI } from "@google/generative-ai"
import axios from "axios"
import fs from "fs"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' })
    }

    res.json({ success: true, user })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


// Apply for a job
export const applyForJob = async (req, res) => {
    
    const { jobId } = req.body
    
    const userId = req.auth.userId
    
    try {
        
        const isAlreadyApplied = await JobApplication.find({jobId, userId})
        
        if (isAlreadyApplied.length > 0) {
            return res.json({success: false, message: 'Already Applied'})
        }
        const jobData = await Job.findById(jobId)
        
        if (!jobData) {
            return res.json({success: false, message: 'Job Not Found'})
        }
        
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        
        res.json({success: true, message: 'Applied Successfully'})
        
    }
    catch(error){
        res.json({ success: false, message: error.message })
    }
}

export const getUserJobApplications = async (req, res) => {
    
    try {
        
        const userId = req.auth.userId
        
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()
        
        if (!applications) {
            return res.json({ success: false, message: 'No applications found' })
        }

        const filteredApplications = applications.filter(app => app.jobId !== null);
        
        return res.json({ success: true, applications: filteredApplications })
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        
        const userId = req.auth.userId
        
        const resumeFile = req.file
        
        const userData = await User.findById(userId)
        
        if (resumeFile) {
            const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success: true,message: "Resume Updated"})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const matchResume = async (req, res) => {
    console.log("matchResume function called");
    try {

      const { jobId } = req.body;
      const { userId } = req.auth; // ✅ Clerk fix
  
      const user = await User.findById(userId);
      if (!user || !user.resume) {
        return res
          .status(404)
          .json({ success: false, message: "User or resume not found" });
      }
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
  
      console.log("Fetching resume from URL:", user.resume);
      const response = await axios.get(user.resume, { responseType: "arraybuffer" });
      const resumeBuffer = Buffer.from(response.data);
      let resumeText;
  
      try {
        console.log("Parsing PDF");
        const data = await pdf(resumeBuffer);
        resumeText = data.text;
        console.log("PDF parsed successfully");
      } catch (error) {
        console.error("Error parsing PDF:", error);
        return res.status(500).json({ success: false, message: "Error parsing PDF", error: error.message });
      }

      const model = genAI.getGenerativeModel({ model: "models/gemini-pro-latest" });
  
      const prompt = `Given the following resume and job description, please provide a percentage match, strong points, and improvement suggestions.\n      Resume: ${resumeText}\n      Job Description: ${job.description}\n      Output should be in JSON format with keys: "percentageMatch" (string), "strongPoints" (array of objects with "point" and "evidence" keys), "improvementSuggestions" (array of objects with "point" and "evidence" keys).`;
  
              try {
                console.log("Calling Gemini API");
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();
                console.log("Gemini API call successful");
      
                let matchData;
                try {
                  const jsonMatch = responseText.match(/```json\n(.*)\n```/s);
                  if (jsonMatch && jsonMatch[1]) {
                    matchData = JSON.parse(jsonMatch[1]);
                  } else {
                    matchData = { rawText: responseText }; // fallback if not JSON
                  }
                } catch {
                  matchData = { rawText: responseText }; // fallbacK if not JSON
                }
      
                res.json({ success: true, matchData });
              } catch (error) {
                console.error("Error from Gemini API:", error);
                res
                  .status(429)
                  .json({ success: false, message: "API quota exceeded. Please check your plan and billing details." });
              }    } catch (error) {
      console.error("Error in matchResume function:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };