const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/User");
const videoRoutes = require('./Routes/videoroutes');
const ebookRoutes = require('./Routes/E_bookroutes');
const adminRoutes = require('./Routes/adminroutes');
const subscriptionRoutes = require('./Routes/SubscriptionRoutes');
const mongoose = require('mongoose')
// database connection
const MONGO_URI='mongodb+srv://shiekhfarhanyousaf1813:farhan1234@cluster0.einbzzv.mongodb.net/Admin_model'
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to database')    
  })
  .catch((err) => {
    console.log(err)
  }) 
// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api/User", userRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/ebooks",ebookRoutes)
app.use("/api/subscription",subscriptionRoutes)

const port =  3000;
app.listen(port, console.log(`Listening on port ${port}...`));
