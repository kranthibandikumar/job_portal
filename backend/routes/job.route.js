const express = require("express");
const AuthMiddleware = require("../middleware/auth.middleware");
const JobModel = require("../models/job.model");
const roleMiddleware = require("../middleware/role.middleware");
const ApplicationModel = require("../models/application.model");

const jobRouter = express.Router();

jobRouter.post("/create", AuthMiddleware, roleMiddleware(["employer"]), async (req, res) => {

    try {
        if (!req.user || req.user.role !== "employer") {
            return res.status(403).json({ message: "Only employers can post jobs" });

        }

        const { title, description, company, location, salary } = req.body

        if (!title || !company || !location || !salary || !description) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const new_job = await JobModel.create({
            title,
            company,
            location,
            description,
            salary,
            postedBy: req.user.id
        })


        res.status(201).json({ message: "Job posted successfully", new_job });

    } catch (error) {
        console.log("Failed", error)
        res.status(500).json({ message: "Error posting job" })
    }
})



jobRouter.get("/", AuthMiddleware, async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        let filter = {};

        if (search) {
            filter.$or = [
                { title: new RegExp(search, "i") }, 
                { company: new RegExp(search, "i") },
                { location: new RegExp(search, "i") }
            ];
        }

        const totalCount = await JobModel.countDocuments(filter); 
        const jobs = await JobModel.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({ message: "Jobs fetched successfully", jobs, totalCount });
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
});


jobRouter.get("/my-jobs", AuthMiddleware, roleMiddleware(["employer"]), async (req, res) => {

    try {
        const employerId = req.user.id;
        const jobs = await JobModel.find({ postedBy: employerId });

        res.status(200).json({ message: "Your posted jobs fetched successfully", jobs })
    } catch (error) {
        res.status(500).json({ message: "Error fetching your jobs", error })
    }

})


jobRouter.delete("/:jobId", AuthMiddleware, roleMiddleware(["employer"]), async (req, res) => {

    try {
        const { jobId } = req.params;

        const job = await JobModel.findOne({ _id: jobId, postedBy: req.user.id });

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized" })
        }

        await JobModel.findByIdAndDelete(jobId);

        await ApplicationModel.deleteMany({ job: jobId });

        res.status(200).json({ message: "Job and associated applications have been deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting job" });
    }
})


jobRouter.get("/:jobId", AuthMiddleware, async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await JobModel.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json({ message: "Job details fetched successfully", job });
    } catch (error) {
      res.status(500).json({ message: "Error fetching job details", error });
    }
  });
  


module.exports = jobRouter;