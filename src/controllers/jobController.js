const jobModel = require("../models/jobModel")

const getJobs = async (req, res) => {
    const jobs = await jobModel.getAllJobs()
    res.json(jobs)
};

const getJob = async (req, res) => {
    const job = await jobModel.getJobById(req.params.id)
    if(!job) return res.status(404).json({ message: "Job not found" });
    res.json(job)
}

const addJob = async (req, res) => {
    const { company, position, status } = req.body;
    const job = await jobModel.createJob(company, position, status)
    res.status(201).json(job)
}

const editJob = async (req, res) => {
    const { company, position, status } = req.body;
    const job = await jobModel.updateJob(req.params.id, company, position, status);
    if(!job) return res.status(404).json({ message: "Job not found "})
    res.json(job)
}

const removeJob = async (req, res) => {
    await jobModel.deleteJob(req.params.id)
    res.json({ message: "Job deleted "})
};

module.exports = { getJobs, getJob, addJob, editJob, removeJob }