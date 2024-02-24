const express = require('express');
const { model } = require('mongoose');
const checkoutModel = require('../../models/checkout/checkoutModel');
const reviewModel = require('../../models/reviews/reviewsModel');
const agentRoute = express.Router();

//reviwe get agent based 
agentRoute.get('/reviews', async (req, res) => {
  try {
    const result = await reviewModel.find().populate("id");
    // console.log(result);
    if (result.length) {
      const email = req.query.id;
      const sortedData = result.filter(review => review.id.author.contact == email);
      // console.log("review data is goted",);
      res.send({ "dataLength": sortedData.length })
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log('fail to find all reviews data', error.message)
    res.send(error).status(500)
  }
})

//delete
agentRoute.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    // Use deleteOne with a query based on _id
    const deletedItem = await checkoutModel.deleteOne({ _id: itemId });
    res.send(deletedItem);
  } catch (error) {
    console.log(error);
  }
});

// order update /propetices/update/
agentRoute.patch('/propetices/update/:id', async (req, res) => {
  try {
    console.log(req.params.email)
    const result = await checkoutModel.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        title: req?.body?.title,
        description: req?.body?.description,
        property_image: req?.body?.bannerImage,
        mapCode: req?.body?.mapCode,
        type: req?.body?.PropertyTypes,
        property_status: req?.body?.purpose,
      }
    });
    console.log(result)
    // console.log(' a single user is inserted successfully to database');
    res.send(result).status(200)
  } catch (error) {
    // console.log(' a single user insertion failed to database');
    res.send(error.message).status(500)
  }
});


module.exports = agentRoute;
