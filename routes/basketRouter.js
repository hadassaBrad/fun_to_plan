const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket } = require('../controllers/basketController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
 try {
    const id = req.query.user_id;
    console.log("id: "+id);
    res.send(await getBasket(id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})


router.post("/", async (req, res) => {
    try {
        const response = await createBasket(req.body.userid ,req.body.siteId);
         res.send(await getSingleBasket(response.id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.delete("/", async (req, res)=>{
    try {
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
    try{
        const site_id = req.params.id;
        const user_id = req.query.user_id;
        console.log("in delete router!")
        await deleteSingleBasket( site_id,user_id);
        res.send();
    }catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router