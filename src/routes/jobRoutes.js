const express = require("express")
const jobController = require("../controllers/jobController")


const  router  = express.Router()

router.get("/", jobController.getJobs)
router.get("/:id", jobController.getJob)
router.post("/", jobController.addJob)
router.put("/:id", jobController.editJob)
router.delete("/:id", jobController.removeJob)

module.exports =  router;