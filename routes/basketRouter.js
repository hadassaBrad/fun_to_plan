const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket, createMultyPileBasket } = require('../controllers/basketController');

const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyUser = require("../middlewares/verifyUser");
const verifyguide = require("../middlewares/verifyguide");

const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', 
 credentials: true
}));

router.get("/", verifyJWT, verifyUser, async (req, res) => {
    try {
        const id = req.query.user_id;
     
        const basket=await getBasket(id);
        console.log(basket);       
        res.send(basket);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})


router.post("/", verifyJWT, verifyUser,  async (req, res) => {
    try {

        if (req.body.site.length == 1) {
            const response = await createBasket(req.body.user.id, req.body.site[0].id);
            res.send(await getSingleBasket(response.id));
        }
        else {
            const response = await createMultyPileBasket(req.body);

        }
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.delete("/", verifyJWT, verifyUser, async (req, res) => {
    try {
        console.log("in delete router!")

        const id = req.query.user_id;
        res.send(await deleteAllBasket(id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});


router.delete("/:id", verifyJWT, verifyUser,  async (req, res) => {
    try {
        console.log("in delete router!")

        const site_id = req.params.id;
        const user_id = req.query.user_id;
        console.log("in delete router!")
        await deleteSingleBasket(user_id, site_id);
        res.send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router