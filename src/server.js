const express = require('express');
const { connect } = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT||5000;
const connectDB = require('./db/connectDB/connectDB')



app.get('/homify', (req, res) => {
  res.send('homifyestates server is running .....!')
});

app.all('*',(req,res,next)=>{
    const error =new Error(`Can't find ${req.originalUrl} on the server`)
    error.status=404;
    next(error);

});
app.use((err,req,res,next)=>{
   res.status(err.status || 500).json({
    message:err.message
   });
})

const main=async()=>{
  await connectDB()
  app.listen(port, () => {
    console.log(`homifyestates is running ${port}`)
  });
};
main();