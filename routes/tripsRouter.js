const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//const { createSite, getSites, getSite, deleteSite, updateSite } = require('../controllers/sitesController');
const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', // Replace with your frontend app URL
 credentials: true
}));
