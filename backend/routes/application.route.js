const express = require("express")
const AuthMiddleware = require("../middleware/auth.middleware");
const JobModel = require("../models/job.model");
const ApplicationModel = require("../models/application.model");
const roleMiddleware = require("../middleware/role.middleware");

const applicationRouter = express.Router()


applicationRouter.post("/apply/:jobId", AuthMiddleware,roleMiddleware(["seeker"]) ,async(req,res) => {

    try {
        const {jobId} = req.params;
        const userId = req.user.id 
        
        const job = await JobModel.findById(jobId);
    
        if(!job){
            
            return res.status(404).json({message:"Job not found"});
    
        }
        const existingApplication = await ApplicationModel.findOne({job: jobId,applicantId: userId })
    
        if(existingApplication){
            return res.status(400).json({message:"You have already applied for this job"});
    
        }
    
    
        const new_application = await ApplicationModel.create({
            job:jobId,
            applicantId:userId,
        });
        
        res.status(201).json({message:"Application submitted successfully", new_application})
    } catch (error) {
        console.log("Error in application route:", error);
        res.status(500).json({message:"Error applying for job"})
    }
})


applicationRouter.get("/seeker-applications",AuthMiddleware,roleMiddleware(["seeker"]) ,async(req,res) => {

    try {
        const applicantId = req.user.id;
    
        const applications = await ApplicationModel.find({applicantId}).populate("job", "title company location salary")
        
        res.status(200).json({message:"Applications fetched succesfully", applications});

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error fetching applications"})
    }
})


applicationRouter.put("/:id/status", AuthMiddleware, async(req,res) => {

    try {
        const {id} = req.params;
        const {status} = req.body;
    
        if(!status || !["pending", "shortlisted","rejected"].includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }
    
        const application = await ApplicationModel.findById(id).populate("job");
    
        if(!application) {
            return res.status(404).json({message:"Application not found"});
        }
    
        if(req.user.role !== "employer"){
            return res.status(403).json({message:"Access denied"})
        }
    
        application.status = status;
        await application.save();
    
        res.status(200).json({message:"Status updated", application});
    } catch (error) {
        res.status(500).json({message:"Error updating application status", error})
    }
})


applicationRouter.get("/employer-applications", AuthMiddleware, roleMiddleware(["employer"]), async(req,res) => {

    try {
        const employerId = req.user.id;
    
        const applications = await ApplicationModel.find().populate({
            path:"job",
            select:"title company location salary",
            match: {postedBy: employerId},
        })
        .populate("applicantId", "name email");

        const filteredApplications = applications.filter(app => app.job)
    
        res.status(200).json({message:"Applications fetched successfully", applications: filteredApplications})
    } catch (error) {
        res.status(500).json({message:"Error fetching applications", error})
    }
})



module.exports = applicationRouter