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
        console.log("in router      " + req.body);
        const response = await createSite(req.body.siteName, req.body.url, req.body.description, req.body.popularity, req.body.difficultyLevel, req.body.area, req.body.price, req.body.age, req.body.openingHour, req.body.closingHour, req.body.latitude, req.body.longitude, req.body.trackLength);
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
        console.log("in put of sites router");
        const id = req.params.id;
        console.log("in put roter  " + id)
        await updateSite(id, req.body.siteName, req.body.url, req.body.description, req.body.popularity, req.body.difficultyLevel, req.body.area, req.body.price, req.body.age, req.body.openingHour, req.body.closingHour, req.body.latitude, req.body.longitude, req.body.trackLength)
        res.send(await getTodo(id));
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
        console.log("in delete router!!!!!")
        await deleteSite(id);
        res.send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router