const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createSite, getSites, getSite, deleteSite, updateSite } = require('../controllers/sitesController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const start = parseInt(req.query._start) || 0;
        const limit = parseInt(req.query._limit) || 10;
        console.log("gaaaaaaa")

        res.send(await getSites(start, limit));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const site = await getSite(id);
        res.send(site)
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await createSite(req.body.id, req.body.url, req.body.description, req.body.popularity, req.body.id_difficulty, req.body.id_area, req.body.price, req.body.id_age, req.body.opening_hour, req.body.closing_hour, req.body.latitude, req.body.longitude, req.body.track_length);
        res.send(await getSite(response.insertId));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await updateSite(id, req.body.url, req.body.description, req.body.popularity, req.body.id_difficulty, req.body.id_area, req.body.price, req.body.id_age, req.body.opening_hour, req.body.closing_hour, req.body.latitude, req.body.longitude, req.body.track_length)
        res.send(await getTodo(id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        await deleteSite(id);
        res.send();
    }catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router