const express = require("express");
const router = express.Router();
const { 
    createFixedEnquiry,
    createCustomEnquiry, 
    getAppDevelopmentService,
    getAppFixedService,
    updateEnquiry,
    updateCustomEnquiry,
    deleteEnquiry,
    deleteCustomEnquiry, 
} = require("../../../controllers/ServiceController/appDev/enquaryController");
const multer = require('multer');

const upload = multer();

// Route: /services/app-development
router.get("/get-appservice", upload.none(), getAppDevelopmentService);
router.post("/appfixedqueiry", upload.none(), createFixedEnquiry);
router.post("/appcustomqueiry", upload.none(), createCustomEnquiry);
router.post("/get-appfixedservice", upload.none(),getAppFixedService);
router.put("/enquiryupdate/:id", upload.none(), updateEnquiry),
router.put("/fixedenquiryupdate", upload.none(), updateCustomEnquiry),
router.delete("fixed-serviceremove", upload.none(), deleteEnquiry),
router.delete("custom-serviceremove", upload.none(), deleteCustomEnquiry)


module.exports = router;
