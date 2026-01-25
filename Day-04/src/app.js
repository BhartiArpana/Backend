// server create krenge 
// server ko config krenge

const express = require('express')
const app = express()  //server created
app.use(express.json())

const notes = []

app.get('/',(req,res)=>{
    res.send('hello world')
})
 app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes);
    
    res.send('note creacted')
 })

 app.get('/notes',(req,res)=>{
    res.send(notes)
 })

 app.delete('/notes/:id',(req,res)=>{
    console.log(req.params.id);
    delete notes[req.params.id]
    res.send('note deleted!')
 })

 app.patch('/notes/:id',(req,res)=>{
    notes[req.params.id].description = req.body.description
    res.send('note updated!')
 })
module.exports = app