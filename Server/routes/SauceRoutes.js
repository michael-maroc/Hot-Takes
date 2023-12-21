import express from 'express';
import { likingSystem } from "../controllers/LikeController.js";
import { createSauce, deleteSauce, getAllSauces, getOneSauce, updateSauce } from "../controllers/SauceController.js";
import multer from "../middleware/multer-config.js";

const router = express.Router();

// Partie Sauces
router.get('/', getAllSauces);
router.post('/', multer, createSauce);
router.get('/:id', getOneSauce);
router.put('/:id', multer, updateSauce);
router.delete('/:id', deleteSauce);

// Partie Likes
router.post('/:id/like', likingSystem);


export default router;