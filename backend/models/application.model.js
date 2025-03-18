
const mongoose = require("mongoose")

const ApplicationSchema  = new mongoose.Schema({
    job:{type: mongoose.Schema.Types.ObjectId, ref:"job", required:true},
    applicantId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    status: {type: String, enum:["pending", "shortlisted","rejected"], default:"pending"},
    appliedAt:{type: Date, default: Date.now}

})

const ApplicationModel = mongoose.model("application", ApplicationSchema)

module.exports = ApplicationModel