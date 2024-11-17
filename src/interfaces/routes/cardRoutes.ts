import express from 'express';
import { searchCards } from '../controllers/cardContrioller';

const router = express.Router();

// Route for searching cards
router.get('/search', searchCards);

export default router;