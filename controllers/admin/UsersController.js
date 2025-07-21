const User = require("../../models/user.js");


module.exports = {
  index: async (req, res) => {
    const users = await User.find({}, { _id: 1, name: 1, email: 1 })
    res.render('admin/users/index', { users: users })
  },
}