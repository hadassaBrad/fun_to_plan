const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket, createMultyPileBasket } = require('../controllers/basketController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const id = req.query.user_id;
        console.log("id: " + id);
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


router.post("/", async (req, res) => {
    try {
        console.log("in router basket, am i here?????")
        console.log(req.body);
        if (req.body.site.length == 1) {
            console.log("in single basket....... ")
            const response = await createBasket(req.body.user.id, req.body.site[0].id);
            console.log("response in post single basket")
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

router.delete("/", async (req, res) => {
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


router.delete("/:id", async (req, res) => {
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