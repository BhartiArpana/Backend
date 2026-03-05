const songModel = require('../models/songs.models')
const id3 = require('node-id3')
const storageService = require('../services/storage.service')

async function uploadSong(req,res){
    // console.log(req.file);
    const songBuffer = req.file.buffer
    const {mood} = req.body
    const tag = id3.read(songBuffer)
    // console.log(tag);

    const songFile = await storageService.uploadFile({
        buffer:songBuffer,
        filename:tag.title +'mp3',
        folder:'/cohort-2/moodify/songs'
    })

    const postertFile = await storageService.uploadFile({
        buffer:tag.image.imageBuffer,
        filename:tag.title +'.jpeg',
        folder:'/cohort-2/moodify/posters'
    })

    const songs = await songModel.create({
        url:songFile.url,
        posterUrl:postertFile.url,
        title:tag.title,
        mood
    })
    res.status(201).json({
        message:'songs created successfully!',
        songs
    })
    
}

async function getSongByMood(req,res){
    const {mood} = req.query

    const song = await songModel.find({
        mood
    })

    res.status(200).json({
        message:'song fetches',
        song
    })
}

module.exports = {
    uploadSong,
    getSongByMood
}