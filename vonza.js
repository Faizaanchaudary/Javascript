const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const subjects=[
    {id : 1 , name : 'Chemistry'},
    {id : 2 , name : 'Physics'},
    {id : 3 , name : 'Computer'}
];


app.get('/' , (req , res)=>{
res.send('The Vonza Academy');
});


app.get('/api/subjects' ,(req, res) =>{
res.send(subjects);
});


app.get('/api/subjects/:id' , (req, res) =>{
const subject =subjects.find(subjects => subjects.id == parseInt(req.params.id));
if(!subject) return res.status(404).send('The Subject With Given Id Was Not Found');
res.send(subject);
});

app.post('/api/subjects' , (req , res)=>{
    const {error} = validateSubject(req.body) 
    
    if (error) return res.send(error.details[0].message);
const subject ={
    id : subjects.length + 1,
    subName: req.body.name
};
subjects.push(subject);
res.send(subject);
});


app.put('/api/subjects/:id' , (req , res) =>{
const subject =subjects.find(subjects => subjects.id == parseInt(req.params.id));
if(!subject) return res.status(404).send('The Subject With Given Id Was Not Found');
const {error} = validateSubject(req.body);
if (error) return res.send(error.details[0].message);
subject.name = (req.body.name);
res.send(subject);
});




app.delete('/api/subjects/:id' , (req , res)=>{
const subject =subjects.find(subjects => subjects.id == parseInt(req.params.id));
if(!subject) return res.status(404).send('The Subject With Given Id Was Not Found');
const index = subjects.indexOf(subject);
subjects.splice(index , 1);
res.send(subject);
});


function validateSubject(subject){
    const schema ={
        name : Joi.string().min(3).required()
    };
    return Joi.validate(subject , schema);
}








app.listen(500 , () => console.log('Listening on Port 500......'));