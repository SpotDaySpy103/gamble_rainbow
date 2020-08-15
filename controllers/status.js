const Matches = require('../models/Matches')
const Logs = require('../models/Logs')
const LeUser = require("../models/LeUser");
const Bet = require("../models/Bet");


exports.updateStatus = async (req, res) => {
    try {
        let d = new Date()
        var records = await Matches.findAll({
            where: {
                status: '0'
            }
        })
        for (let i = 0; i < records.length; i++) {
            if (d > records[i].start_at) {
                let statusOne = {
                    status: '1'
                }
                await records[i].update(statusOne)
                var log = {
                    matches_id: '',
                    status: 'Live'
                }
                log.matches_id = records[i].matches_id
                await Logs.create(log)
            }
        }

        let response = {
            status: true,
            message: 'Live'
        }
        res.json(response)
    } catch (err) {
        let response = {
            status: false,
            message: "err: " + err
        }
        res.json(response)
    }
}

exports.statusMatch = async (req, res) => {
    try {
        let inputMatch = {
            matches_id: parseInt(req.body.matches_id),
        }
        var records = await Matches.findOne({
            where: {
                matches_id: inputMatch.matches_id,
                status: '1'
            }
        })

        let rate = records.result == 1 ? records.rating_home : records.rating_away

        if (records) {
            await records.update({
                status: '2'
            })

            let bets = await Bet.findAll({
                where: {
                    matches_id: records.matches_id
                }
            })

            for (let i = 0; i < bets.length; i++) {
                if (bets[i].bet_team == records.result) {
                    let user = await LeUser.findOne({
                        where: {
                            user_id: bets[i].user_id
                        }
                    })

                    await user.update({
                        user_credit: (bets[i].bet_money * rate) + user.user_credit + bets[i].bet_money
                    })

                    await bets[i].update({
                        status: 'Pay already'
                    })
                }else{
                    await bets[i].update({
                        status: 'Bet lose'
                    })
                }

            }

            let response = {
                status: true,
                message: "OK"
            }
            res.json(response)
        } else {
            res.status(400).json({
                message: "Not finish yet",
                status: false
            })
        }

    } catch (err) {
        let response = {
            status: false,
            message: "err: " + err
        }
        res.json(response)
    }
}

exports.cancelMatch = async (req, res) => {
    try {
        let dataInput = {
            matches_id: parseInt(req.body.matches_id)
        }
        // Find matches_id in tbl_matches
        let id = await Matches.findOne({
            where: {
                matches_id: dataInput.matches_id
            }
        })
        let results = {
            status: '3'
        }

        await id.update(results)

        let log = {
            matches_id: '',
            status: 'Cancel match'
        }
        log.matches_id = id.matches_id
        await Logs.create(log)

        let response = {
            status: true,
            message: 'Cancel match'
        }
        res.json(response)
    } catch (err) {
        let response = {
            status: false,
            message: "err: " + err
        }
        res.json(response)
    }
}

exports.userById = async (req, res) => {
    try {
        let dataInput = {
            user_id: parseInt(req.body.user_id)
        }
        let id = await LeUser.findOne({
            where: {
                user_id: dataInput.user_id
            }
        })

        let response = {
            status: true,
            message: id
        }
        res.json(response)
    } catch (err) {
        let response = {
            status: false,
            message: "err: " + err
        }
        res.json(response)
    }
}