const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    company:{type:String, required:true},
    location:{type:String, required:true},
    salary:{type:Number, required:true},
    postedBy:{type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    
}, {timestamps: true})

const JobModel = mongoose.model("job",JobSchema);

module.exports = JobModel