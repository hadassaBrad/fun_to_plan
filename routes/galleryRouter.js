const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createPhoto, getGallery, deletePhoto } = require('../controllers/galleryController');

const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', // Replace with your frontend app URL
 credentials: true
}));
router.get("/", async (req, res) => {
    try {
        const start = parseInt(req.query._start) || 0;
        const limit = parseInt(req.query._limit) || 10;
        console.log("gaaaaaaa")

        res.send(await getGallery(start, limit));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const response = await createPhoto(req.body.id, req.body.url, req.body.name)
        res.send(await getGallery(response.insertId));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deletePhoto(id);
        res.send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router