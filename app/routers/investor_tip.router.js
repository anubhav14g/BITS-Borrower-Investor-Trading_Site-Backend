const router = require('express').Router();
const investorTipController = require('../controllers/investor_tip.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

router.get("/investor_tip/view/all/tips", investorTipController.viewTip);

router.post("/investor_tip/create/tip", jwtMiddleware.verify, investorTipController.createTip);

router.get("/investor_tip/like/tip/:tip_id", jwtMiddleware.verify, investorTipController.likeTip);

router.get("/investor_tip/dislike/tip/:tip_id", jwtMiddleware.verify, investorTipController.dislikeTip);

router.post("/investor_tip/comment/tip/:tip_id", jwtMiddleware.verify, investorTipController.commentTip);

router.get("/investor_tip/get/all/comments/tip/:tip_id", investorTipController.getAllComments);

module.exports = router;