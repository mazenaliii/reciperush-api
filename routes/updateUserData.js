const express = require("express");
const router = express.Router();
const user = require("../models/user");


router.patch('/update-data', async (req, res) => {
  try {
    const data = req.body;

    if (data) {
      const { UserId } = data;
      const name = data.values.name
      const username = data.values.username
      const email = data.values.email

      const User = await user.findById(UserId);
      const existingUserByUsername = await user.findOne({ username });
      const existingUserByEmail = await user.findOne({ email });



      if (User) {
        if (existingUserByUsername && existingUserByUsername._id.toString() !== UserId) {
          return res.json({ errMessage: 'Username already exists.' }).status(409)
        }

        if (existingUserByEmail && existingUserByEmail._id.toString() !== UserId) {
          return res.json({ errMessage: 'Email already in use.' }).status(409)
        }
        const dataUpdated = await user.findOneAndUpdate(
          { _id: UserId },
          { name, username, email }
        )

        dataUpdated ?
          res.json({ successMessage: 'User information updated successfully', name, username, email }).status(200) :
          res.status(404).json({ errMessage: 'Failed to update user informations, Please try again later.' })
      } else {
        res.status(404).json({ errMessage: 'Failed to update user informations, Please try again later.' })
      }
    } else {
      res.json({ errMessage: 'Failed to update user informations, This is a server error and will be fixed very soon.' }).status(400)
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ errMessage: 'Failed to update user informations, Internal server error' })
  }
});


module.exports = router;                                
