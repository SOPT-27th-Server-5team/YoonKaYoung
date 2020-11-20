const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const upload = require('../../modules/multer');

router.post('/', upload.single('image'), postController.createPost); //요청 바디 중에 key: image인 애를 multer를 사용해 s3에 저장한다.
router.get('/', postController.readAllPosts);
router.post('/:postId/like', postController.createLike);
router.delete('/:postId/like', postController.deleteLike);

module.exports = router;