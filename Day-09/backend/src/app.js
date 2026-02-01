const express = require('express')
const app = express()
app.use(express.json())
const noteModel = require('./model/notes.model')

app.post('/api/notes',async(req,res)=>{
    const {title,description} = req.body
   const note =  await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:'note created successfully!',
       note
    })
})
app.get('/api/notes',async(req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message:'notes fetch successfully',
        note
    })
})
app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:'note deleted successfully'
    })
})
app.patch('/api/notes/:id',async(req,res)=>{
     const id=req.params.id
     const {description} = req.body
    await noteModel.findByIdAndUpdate(id,{description})
     res.status(200).json({
        message:'note updated successfully!'
     })
})

module.exports = app