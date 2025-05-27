const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const ejs = require('ejs')
const appServiceRoutes = require('./routes/servicesRoutes/appDevRoutes/app_dev_route')



dotenv.config();
const app = express();

// Middleware
app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


// DB
connectDB();

// Routes

app.get("/",function(req,res){
    res.render('dashboard')
})

app.get("/services",function(req,res){
    res.render("services/services")
})

app.use("/app-service", appServiceRoutes);
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/v1/",require("./routes/obboarding"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
