"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};
exports.postData = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
};
