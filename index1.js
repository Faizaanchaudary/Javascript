const Joi = require('joi');
const express = require('express');
const func = require('joi/lib/types/func');
const app = express();

app.use(express.json());


const jobs =[
{ id : 1 , name :'Developer'},
{ id : 2 , name :'Programmer'},
{ id : 3 , name :'Designer'},
{ id : 4 , name :'Hacker'},
];



app.get('/' , (req , res ) =>{
    res.send('Hello To The Jobs Valley');
});




app.get('/api/jobs' , (req , res) =>{
    res.send(jobs);
    });
    


app.get('/api/jobs/:id' , (req , res ) =>{
   const job = jobs.find( jobs => jobs.id == parseInt(req.params.id));
   if(!job) return  res.status(404).send('Sorry The Job With The Given Id Is Not Present...');
   res.send(job);
});



app.post('/api/jobs' , (req , res) =>{
    const {error} = validateJob(req.body);
        if(error) return  res.status(400).send(error.details[0].message);
        
const newJob ={
id : jobs.length + 1,
jobName : req.body.name
};
jobs.push(newJob);
res.send(newJob);
});


app.put('/api/jobs/:id' , (req , res) =>{
    const job = jobs.find( jobs => jobs.id == parseInt(req.params.id));
    if(!job) return res.status(404).send('Sorry The Job With The Given Id Is Not Present...');
    const {error} = validateJob(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        job.name = req.body.name;
        res.send(job);

});



function validateJob(job){
const schema = {
        name : Joi.string().min(5).required()
        };
        return Joi.validate( job , schema);
};



app.delete('/api/jobs/:id' , (req , res) =>{
    const job = jobs.find( jobs => jobs.id == parseInt(req.params.id));
    if(!job)  return res.status(404).send('Sorry The Job With The Given Id Is Not Present...');
    const index = jobs.indexOf(job);
    jobs.splice(index, 1);
    res.send(job);
});



const port = process.env.PORT || 1500 ;
app.listen(port, ()=> console.log(`Listening On Port ${port}`));