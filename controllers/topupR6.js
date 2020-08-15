const topUp = require("../models/TopupR6")
const LeUser = require("../models/LeUser");
const Logs = require('../models/Logs');
const Admin = require("../models/Admin");
const TopupR6 = require("../models/TopupR6");

exports.createTopup = async (req, res) => {
    try {
        let input = {
            user_name: req.body.user_name,
            topup_amount: parseInt(req.body.topup_amount),
        }

        let user = await LeUser.findOne({
            where: {
                user_name: input.user_name
            }
        })

        if (user) {
            try {
                await topUp.create(input)

                let response = {
                    status: true,
                    userId: input.user_id,
                    Username: input.user_name,
                    Amount: input.topup_amount
                }
                res.json(response)
            } catch (err) {
                let response = {
                    status: false,
                    message: "err2:" + err
                }
                res.json(response)
            }
        } else {
            res.status(400).json({
                message: "Not found this user",
                status: false
            })
        }

    } catch (err) {
        let response = {
            status: false,
            message: "err1:" + err
        }
        res.json(response)
    }
}

exports.updateTopup = async (req, res) => {
    try {
        let input = {
            user_name: req.body.user_name,
            admin_name: req.body.admin_name
        }

        let topup = await TopupR6.findAll({
            where: {
                user_name: input.user_name
            }
        })
        let user = await LeUser.findOne({
            where: {
                user_name: input.user_name
            }
        })

        let admin = await Admin.findOne({
            where: {
                admin_name: input.admin_name
            }
        })

        if (admin) {
            if (user) {
                try {
                    for (let i = 0; i < topup.length; i++){
                        if (topup[i].status !== 'Topup finish'){
                            let topupStatus = {
                                status: 'Topup finish'
                            }
    
                            await topup[i].update(topupStatus)
                            await user.update({
                                user_credit: topup[i].topup_amount + user.user_credit
                            })
                        }
                    }
                    let response = {
                        status: true,
                        Username: input.user_name,
                        TopupStatus: 'Updated'
                    }
                    res.json(response)
                } catch (err) {
                    let response = {
                        status: false,
                        message: "err2:" + err
                    }
                    res.json(response)
                }
            } else {
                res.status(400).json({
                    message: "Not found this user",
                    status: false
                })
            }
        } else {
            res.status(400).json({
                message: "You don't have permission to update",
                status: false
            })
        }

    } catch (err) {
        let response = {
            status: false,
            message: "err1:" + err
        }
        res.json(response)
    }
}