const router = require('express').Router();
const investorController = require('../controllers/investor.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');


router.get("/investor/view/business/equity/applications", jwtMiddleware.verify, investorController.viewBusinessEquityApplications);

router.get("/investor/view/detailed/business/equity/application/:application_id", jwtMiddleware.verify, investorController.viewDetailedBusinessEquityApplication);

router.get("/investor/business/equity/accept/offer/:application_id", jwtMiddleware.verify, investorController.acceptBusinessEquityApplication);

router.get("/investor/business/equity/reject/offer/:application_id", jwtMiddleware.verify, investorController.rejectBusinessEquityApplication);

router.post("/investor/business/equity/counter/offer/:application_id", jwtMiddleware.verify, investorController.counterBusinessEquityApplication);

module.exports = router;