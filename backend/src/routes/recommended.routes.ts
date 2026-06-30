import { Router } from 'express';
import { recommendedMovies } from '../controllers/movie.controller.js';
import { recommendedBooks } from '../controllers/book.controller.js';
import { recommendedMusic } from '../controllers/music.controller.js';
import { recommendedGames } from '../controllers/game.controller.js';

const router = Router();

// Modular Sub-routes
router.post("/movies", recommendedMovies);
router.post("/books", recommendedBooks);
router.post("/music", recommendedMusic);
router.post("/games", recommendedGames);

// Dynamic root delegator for backwards compatibility
router.post("/", (req, res) => {
     const type = req.body.type || 'movies';
     switch (type) {
          case 'books':
               return recommendedBooks(req, res);
          case 'music':
               return recommendedMusic(req, res);
          case 'games':
               return recommendedGames(req, res);
          case 'movies':
          default:
               return recommendedMovies(req, res);
     }
});

export default router;