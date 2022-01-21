const router = require('express').Router();
const businessEquityController = require('../controllers/business_equity.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');


router.get("/business_equity/view/closed/applications", jwtMiddleware.verify, businessEquityController.viewClosed);

router.get("/business_equity/view/closed/application/detailed/view/:application_id", jwtMiddleware.verify, businessEquityController.viewClosedDetailedView);

router.get("/business_equity/reopen/closed/application/:application_id", jwtMiddleware.verify, businessEquityController.openClosedApplication);

router.get("/business_equity/view/open/applications", jwtMiddleware.verify, businessEquityController.viewOpen);

router.get("/business_equity/view/open/application/detailed/view/:application_id", jwtMiddleware.verify, businessEquityController.viewOpenDetailedView);

router.get("/business_equity/open/application/accept/offer/:application_id/:investor_id", jwtMiddleware.verify, businessEquityController.acceptOffer);

router.get("/business_equity/open/application/reject/offer/:application_id/:investor_id", jwtMiddleware.verify, businessEquityController.rejectOffer);

router.post("/business_equity/open/application/counter/offer/:application_id/:investor_id", jwtMiddleware.verify, businessEquityController.counterOffer);

router.get("/business_equity/closed/open/application/:application_id", jwtMiddleware.verify, businessEquityController.closedOpen);

router.post("/business_equity/create/application", jwtMiddleware.verify, businessEquityController.create);


module.exports = router;