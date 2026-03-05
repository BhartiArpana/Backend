const Router = require('express')
const upload = require('../middleware/upload.middleware')
const songController = require('../controllers/song.controller')

const router = Router()

// Post /api/songs
router.post('/',upload.single('song'),songController.uploadSong)

// get /api/songs
router.get('/',songController.getSongByMood)

module.exports = router