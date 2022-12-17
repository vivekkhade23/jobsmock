const express = require("express");
const jobModel = require("../Model/job.model");
const jobRouter = express.Router();



jobRouter.post("/addjob", async (req, res) => {
  const { company,city,location,role,level,position,language,contract , userId } = req.body;
 const postedAt=new Date()
  const new_job = new jobModel({
    company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
    userId,
  });
  await new_job.save();
  res.send({ message: "job Created Successfully", job: new_job });
});

jobRouter.get("/", async (req, res) => {
  const q = req.query.q;
  const page = req.query.page || 1;
  const { userId } = req.body;
  const sortBy = req.query.sortBy;
  const filter = req.query.filter;
  const limit=12
  const skip = (+page - 1) * limit;
  
  if (q) {
  const job = await jobModel.find({ language: q }).skip(skip).limit(limit);
  return res.send(job);
  }
  
  
  if (sortBy == "asc") {
  const job = await jobModel.find({ userId }).sort({ age: 1 }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if (sortBy == "desc") {
  const job = await jobModel.find({ userId }).sort({
  age: -1,
  }).skip(skip).limit(limit);
  return res.send(job);
  }
  
  if(filter=="Frontend"){
  const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if(filter=="Backend"){
  const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
  return res.send(job);
  }
  else if(filter=="FullStack"){
    const job = await jobModel.find({ role: filter }).skip(skip).limit(limit);
    return res.send(job);
    }
  
  const job = await jobModel.find({ userId }).skip(skip).limit(limit);;
  return res.send(job);
  });

module.exports = jobRouter;