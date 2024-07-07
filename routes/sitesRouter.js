const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createSite, getSites, getSite, deleteSite, updateSite } = require('../controllers/sitesController');
const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', // Replace with your frontend app URL
 credentials: true
}));
const verifyJWT=require("../middlewares/verifyJWT");
const verifyAdmin=require("../middlewares/verifyAdmin");

router.get("/", async (req, res) => {
    try {
        const start = parseInt(req.query._start) || 0;
        const limit = parseInt(req.query._limit) || 10;
        const age = parseInt(req.query.age) || null;
        const area = parseInt(req.query.area) || null;
        const difficulty = parseInt(req.query.difficulty) || null;
        console.log("gaaaaaaa");
        console.log(" area : "+ area +" difficulty:"+difficulty+"age:"+age);
        const allSites = await getSites(age, area, difficulty, start, limit);
        console.log("all sites....  "+allSites);
        console.log(allSites);
        const sitesToReturn = allSites.map(site => {
            return {
                id: site.id,
                siteName: site.site_name,
                url: site.url
            }
        })
        res.status(200).send(sitesToReturn);
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
        const newSite = {
            id: site.id,
            siteName: site.site_name,
            url: site.url,
            description: site.description,
            popularity: site.popularity,
            difficultyLevel: site.difficulty_level,
            area: site.area_name,
            price: site.price,
            age: site.age_range,
            openingHour: site.opening_hour,
            closingHour: site.closing_hour,
            latitude: site.latitude,
            longitude: site.longitude,
            trackLength: site.track_length
        }
        console.log("in result of get site router:");
console.log(newSite);
        res.status(200).send(newSite);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.post("/",verifyJWT, verifyAdmin, async (req, res) => {
    try {
        console.log("in router      " + req.body);
        const response = await createSite(req.body.siteName, req.body.url, req.body.description, req.body.popularity, req.body.difficultyLevel, req.body.area, req.body.price, req.body.age, req.body.openingHour, req.body.closingHour, req.body.latitude, req.body.longitude, req.body.trackLength);
        const site=await getSite(response.insertId);
        const newSite = {
            id: site.id,
            siteName: site.site_name,
            url: site.url,
            description: site.description,
            popularity: site.popularity,
            difficultyLevel: site.id_difficulty,
            area: site.id_area,
            price: site.price,
            age: site.id_age,
            openingHour: site.opening_hour,
            closingHour: site.closing_hour,
            latitude: site.latitude,
            longitude: site.longitude,
            trackLength: site.track_length
        }
      
        console.log(newSite);
        res.status(200).send(newSite);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.put("/:id",verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        const updatedSite = await updateSite(id, req.body.siteName, req.body.url, req.body.description, req.body.popularity, req.body.difficultyLevel, req.body.area, req.body.price, req.body.age, req.body.openingHour, req.body.closingHour, req.body.latitude, req.body.longitude, req.body.trackLength)
        console.log("updatedSite  " + id);
        const site = await getSite(id);
        const newSite = {
            id: site.id,
            siteName: site.site_name,
            url: site.url,
            description: site.description,
            popularity: site.popularity,
            difficultyLevel: site.id_difficulty,
            area: site.id_area,
            price: site.price,
            age: site.id_age,
            openingHour: site.opening_hour,
            closingHour: site.closing_hour,
            latitude: site.latitude,
            longitude: site.longitude,
            trackLength: site.track_length
        }
      
        console.log(newSite);
        res.status(200).send(newSite);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.delete("/:id", verifyJWT, verifyAdmin, async (req, res) => {
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