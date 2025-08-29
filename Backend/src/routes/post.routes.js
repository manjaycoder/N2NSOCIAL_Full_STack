import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPostController, getPostController, createCommentController, createLikeController } from "../controllers/post.controller.js";
import { createCommentValidator, getPostsValidator, createLikeValidator } from "../middlewares/validator.middleware.js";

import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router();


/* POST /posts */
router.post('/',
    authMiddleware, // req.user
    upload.single("image"), // req.file
    createPostController)

router.get('/',
    getPostsValidator, // Validate query parameters
    authMiddleware,
    getPostController
)

router.post('/comment',
    createCommentValidator,
    authMiddleware,
    createCommentController
)

router.post('/like',
    createLikeValidator,
    authMiddleware,
    createLikeController
)


export default router;