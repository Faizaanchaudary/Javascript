const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies =[
{ id : 1 , name : 'Angel'},
{ id : 2 , name : 'Joker'},
{ id : 3 , name : 'Fool'},
{ id : 4 , name : 'Dark'}
];



app.get('/' , (req , res) =>{
res.send('Hello To The Vidly Movies Centre');
});



app.get('/api/movies' , (req , res)=>{
res.send(movies);
});




app.get('/api/movies/:id' , (req , res ) =>{
const movie = movies.find( movies => movies.id == parseInt (req.params.id));
if(!movie) return res.status(404).send('The Movie With The Given Id Was Not Found');
res.send(movie);
});



app.post('/api/movies' , (req , res) =>{
const {error} = validateMovie(req.body);
if(error) return res.send(error.details[0].message);
const newMovie ={
    id : movies.length + 1,
    movieName : req.body.name
}
movies.push(newMovie);
res.send(newMovie);
});



app.put('/api/movies/:id' , (req , res) =>{
    const movie = movies.find( movies => movies.id == parseInt (req.params.id));
    if(!movie) return res.status(404).send('The Movie With The Given Id Was Not Found');
    const {error} = validateMovie(req.body);
    if(error) return res.send(error.details[0].message);
  movie.name = (req.body.name);
  res.send(movie);
});



app.delete('/api/movies/:id' , (req , res) =>{
    const movie = movies.find( movies => movies.id == parseInt (req.params.id));
    if(!movie) return res.status(404).send('The Movie With The Given Id Was Not Found');
    const index = movies.indexOf(movie);
    movies.splice(index , 1);
    res.send(movie);
});




function validateMovie(movie){
    const schema ={
        name : Joi.string().min(3).required()
    }
    return Joi.validate(movie , schema );
}



const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening On Port ${port}...`));




