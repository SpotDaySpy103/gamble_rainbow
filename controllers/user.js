const LeUser = require("../models/LeUser");
const Admin = require("../models/Admin");
const Bet = require("../models/Bet");

exports.addUser = async (req, res) => {
  try {
    if (req.body.user_name !== undefined) {
      user_name = req.body.user_name.replace(/\W/g, '')
    }
    let newUser = {
      user_name: req.body.user_name.replace(/\W/g, ''),
      user_pass: req.body.user_pass,
      user_credit: req.body.user_credit,
    }
    let user = await LeUser.findOne({
      where: {
        user_name: newUser.user_name
      }
    })
    if (user) {
      res.status(400).json({
        message: "Duplicated Username",
        status: false
      })
    } else {
      try {
        await LeUser.create(newUser)
        // Tell the FRONT-END of the success
        let response = {
          status: true,
          message: 'regsitered success: ' + user_name
        }
        res.json(response)
      } catch (err) {
        let response = {
          status: false,
          message: "err2:" + err
        }
        res.json(response)
      }
    }
  } catch (err) {
    let response = {
      status: false,
      message: "err1:" + err
    }
    res.json(response)
  }
}

exports.addAdmin = async (req, res) => {
  try {
    if (req.body.admin_name !== undefined) {
      admin_name = req.body.admin_name.replace(/\W/g, '')
    }
    let newAdmin = {
      admin_name: req.body.admin_name.replace(/\W/g, ''),
      admin_pass: req.body.admin_pass
    }
    let admin = await Admin.findOne({
      where: {
        admin_name: newAdmin.admin_name
      }
    })
    if (admin) {
      res.status(400).json({
        message: "Duplicated Username",
        status: false
      })
    } else {
      try {
        await Admin.create(newAdmin)
        // Tell the FRONT-END of the success
        let response = {
          status: true,
          message: 'regsitered success: ' + admin_name
        }
        res.json(response)
      } catch (err) {
        let response = {
          status: false,
          message: "err2:" + err
        }
        res.json(response)
      }
    }
  } catch (err) {
    let response = {
      status: false,
      message: "err1:" + err
    }
    res.json(response)
  }
}

exports.history = async (req, res) => {
  try {
    let input = {
      user_id: parseInt(req.body.user_id)
    }

    let user = await LeUser.findOne({
      where: {
        user_id: input.user_id
      }
    })

    if (user) {
      let bets = await Bet.findAll({
        where: {
          user_id: user.user_id
        }
      })

      let response = {
        status: true,
        message: bets
      }
      res.json(response)
    }
    

    

    // if (user) {
    //   res.status(400).json({ message: "Duplicated Username", status: false })
    // } else {
    //   try {
    //     await LeUser.create(newUser)
    //     // Tell the FRONT-END of the success
    //     let response = {
    //       status: true,
    //       message: 'regsitered success: ' + user_name
    //     }
    //     res.json(response)
    //   } catch (err) {
    //     let response = {
    //       status: false,
    //       message: "err2:" + err
    //     }
    //     res.json(response)
    //   }
    // }
  } catch (err) {
    let response = {
      status: false,
      message: "err1:" + err
    }
    res.json(response)
  }
}