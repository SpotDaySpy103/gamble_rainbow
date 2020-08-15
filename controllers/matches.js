const Matches = require('../models/Matches')
const Bet = require("../models/Bet")
const LeUser = require("../models/LeUser")
const Logs = require('../models/Logs')
const rp = require('request-promise')
const $ = require('cheerio')

// process.env.SECRET_KEY = 'secret'


exports.upcomingMatchData = async (req, res) => {
    try {
        let url = 'https://liquipedia.net/rainbowsix/Liquipedia:Upcoming_and_ongoing_matches'
        const imgUrl = 'https://liquipedia.net'
        let contain = await rp(url)
            .then(function (html) {
                //success!
                // console.log(html);
                return $('#bodyContent', html).html()
            })
            .catch(function (error) {
                //handle error
                return error
            });

        let matches = []
        let result = $('div[data-toggle-area-content="1"]', contain).html()
        $('table', result).each((i, el) => {
            let children = $('.match-filler', $(el)).children()
            // get leauge
            let leauge = $('a', $(children)[1]).text()
            //get Time
            let time = $('.versus', $(el)).data('stuff')
            //get Team
            let teams = $('.team-template-text', $(el)).map((j, elem) => $(elem).text())

            //https://liquipedia.net/commons/images/9/9c/Overheat_Esports_th_std.png
            // get image
            let image = $('.team-template-image', $(el)).map((j, elem) => {
                return $('img', $(elem)).attr('src')
            })

            matches.push({
                matches_id: teams[0] + ' ' + teams[1] + ' ' + time,
                team_home: teams[0],
                team_away: teams[1],
                competition_league: leauge,
                start_at: time
                // team: {
                //     left: {
                //         title: teams[0],
                //         logo: imgUrl + image[0]
                //     },
                //     right: {
                //         title: teams[1],
                //         logo: imgUrl + image[1]
                //     }
                // },
                // matchTime: time,
                // leauge: leauge
            })
        })
        //
        // console.log(matches[0]);
        for (let i = 0; i < matches.length; i++) {
            let id = await Matches.findOne({
                where: {
                    matches_id: matches[i].matches_id
                }
            })
            if (id) {
                res.status(400).json({
                    message: "Duplicated matches",
                    status: false
                })
            } else {
                await Matches.create(matches[i])
            }
        }

        let response = {
            status: true,
            message: Matches
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

exports.TestData = async (req, res) => {
    try {
        let url = 'https://liquipedia.net/rainbowsix/Liquipedia:Upcoming_and_ongoing_matches'
        const imgUrl = 'https://liquipedia.net'
        let contain = await rp(url)
            .then(function (html) {
                //success!
                // console.log(html);
                return $('#bodyContent', html).html()
            })
            .catch(function (error) {
                //handle error
                return error
            });

        let matches = []
        let result = $('div[data-toggle-area-content="1"]', contain).html()
        $('table', result).each((i, el) => {
            let children = $('.match-filler', $(el)).children()
            // get leauge
            let leauge = $('a', $(children)[1]).text()
            //get Time
            let time = $('.versus', $(el)).data('stuff')
            //get Team
            let teams = $('.team-template-text', $(el)).map((j, elem) => $(elem).text())

            //https://liquipedia.net/commons/images/9/9c/Overheat_Esports_th_std.png
            // get image
            let image = $('.team-template-image', $(el)).map((j, elem) => {
                return $('img', $(elem)).attr('src')
            })

            matches.push({
                matches_id: teams[0] + ' ' + teams[1] + ' ' + time,
                team_home: teams[0],
                team_away: teams[1],
                competition_league: leauge,
                start_at: time
                // team: {
                //     left: {
                //         title: teams[0],
                //         logo: imgUrl + image[0]
                //     },
                //     right: {
                //         title: teams[1],
                //         logo: imgUrl + image[1]
                //     }
                // },
                // matchTime: time,
                // leauge: leauge
            })
        })
        //
        // console.log(matches[0]);

        let response = {
            status: true,
            message: matches
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

exports.addMatch = async (req, res) => {
    try {
        const crypto = require('crypto')

        const text = 'I love cupcakes'
        const key = 'abcdeg'

        let password = crypto.createHmac('sha1', key)
            .update(text)
            .digest('hex')

        let response = {
            message:  password
        }
        res.json(response)
        // Input data
        // let dataInput = {
        //     matches_id: parseInt(req.body.matches_id),
        //     team_home: req.body.team_home,
        //     team_away: req.body.team_away,
        //     twitch_link: req.body.twitch_link,
        //     youtube_link: req.body.youtube_link,
        //     competition_league: req.body.competition_league,
        //     start_at: new Date(req.body.start_at),
        //     status: parseInt(req.body.status),
        //     score_home: parseInt(req.body.score_home),
        //     score_away: parseInt(req.body.score_away),
        //     result: req.body.result,
        //     rating_home: req.body.rating_home,
        //     rating_away: req.body.rating_away
        // }

        // // Create matches
        // await Matches.create(dataInput)

        // let id = await Matches.findOne({
        //     where: {
        //         matches_id: dataInput.matches_id
        //     }

        // })

        // var log = {
        //     matches_id: '',
        //     status: 'Add match',
        // }
        // log.matches_id = id.matches_id
        // await Logs.create(log)

        // // Tell the FRONT-END of the success
        // let response = {
        //     status: true,
        //     added: id
        // }
        // res.json(response)

    } catch (err) {
        let response = {
            status: false,
            message: "err: " + err
        }
        res.json(response)
    }
}

exports.editMatch = async (req, res) => {
    try {
        let dataInput = {
            matches_id: parseInt(req.body.matches_id),
            team_home: req.body.team_home,
            team_away: req.body.team_away,
            twitch_link: req.body.twitch_link,
            youtube_link: req.body.youtube_link,
            competition_league: req.body.competition_league,
            status: req.body.status,
            score_home: req.body.score_home,
            score_away: req.body.score_away,
            result: req.body.result,
            rating_home: req.body.rating_home,
            rating_away: req.body.rating_away
        }
        // Find matches_id in tbl_matches
        let id = await Matches.findOne({
            where: {
                matches_id: dataInput.matches_id
            }
        })

        let editMatches = {
            team_home: dataInput.team_home,
            team_away: dataInput.team_away,
            twitch_link: dataInput.twitch_link,
            youtube_link: dataInput.youtube_link,
            competition_league: dataInput.competition_league,
            status: dataInput.status,
            score_home: dataInput.score_home,
            score_away: dataInput.score_away,
            result: dataInput.result,
            bet_value: dataInput.bet_value
        }

        await id.update(editMatches)

        var log = {
            matches_id: '',
            status: 'Edit match',
        }
        log.matches_id = dataInput.matches_id
        await Logs.create(log)

        let response = {
            status: true,
            message: editMatches
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

exports.deleteMatch = async (req, res) => {
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
        // Delete tbl_matches
        await Matches.destroy({
            where: {
                matches_id: id.matches_id
            }
        })

        var log = {
            matches_id: '',
            status: 'Delete match'
        }
        log.matches_id = dataInput.matches_id
        await Logs.create(log)

        let response = {
            status: true,
            message: "Delete success"
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

var resultHome = ''

exports.resultMatch = async (req, res) => {
    try {
        let matches = await Matches.findAll()

        for (let i = 0; i < matches.length; i++) {
            if (matches[i].score_home == '2') {
                let resultHome = {
                    result: '1',
                    status: '2'
                }
                await matches[i].update(resultHome)

                let rateHome = matches[i].rating_home

                let bets = await Bet.findAll({
                    where: {
                        matches_id: matches[i].matches_id,
                        bet_team: matches[i].result
                    }
                })
                for (let j = 0; j < bets.length; j++) {
                    if (bets[j].status == 'Not pay yet') {
                        let user = await LeUser.findOne({
                            where: {
                                user_id: bets[j].user_id
                            }
                        })
                        await user.update({
                            user_credit: (bets[j].bet_money * rateHome) + user.user_credit + bets[j].bet_money
                        })

                        await bets[j].update({
                            status: 'Pay already'
                        })
                    }
                }
            }
            if (matches[i].score_away == '2') {
                let resultAway = {
                    result: '2',
                    status: '2'
                }
                await matches[i].update(resultAway)

                let rateHome = matches[i].rating_home

                let bets = await Bet.findAll({
                    where: {
                        matches_id: matches[i].matches_id,
                        bet_team: matches[i].result
                    }
                })
                for (let j = 0; j < bets.length; j++) {
                    if (bets[j].status == 'Not pay yet') {
                        let user = await LeUser.findOne({
                            where: {
                                user_id: bets[j].user_id
                            }
                        })
                        await user.update({
                            user_credit: (bets[j].bet_money * rateHome) + user.user_credit + bets[j].bet_money
                        })

                        await bets[j].update({
                            status: 'Pay already'
                        })
                    }
                }
            }
        }

        let response = {
            status: true,
            message: "Result updated"
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

function findAV() {
    let total = 0
    let average = 0
    let arrValue = [10, 15, 20, 25, 30, 35, 40]
    for (let i = 0; i < arrValue.length; i++) {
        total = total + arrValue[i]
    }
    average = total / arrValue.length
    return average
}
findAV()

const findAVG = (...x) => (x.reduce((a, b) => a + b)) / x.length

findAVG(10, 15, 20, 25, 30, 35, 40, 11, 555)


function findAVold(array) {
    return array.reduce(function (a, b) {
        return a + b
    }) / array.length
}

let arr = [10, 15, 20, 25, 30, 35, 40]
findAVold(arr)

// exports.resultMatch = async (req, res) => {
//     try {
//         let scoreHome = await Matches.findAll({
//             where: {
//                 score_home: '2'
//             }
//         })

//         let scoreAway = await Matches.findAll({
//             where: {
//                 score_away: '2'
//             }
//         })

//         if (scoreHome){
//             for (let i = 0; i < scoreHome.length; i++){
//                 let resultHome = {
//                     result: '1',
//                     status: '2'
//                 }
//                 await scoreHome[i].update(resultHome)

//             }
//         }

//         if (scoreAway){
//             for (let i = 0; i < scoreAway.length; i++){
//                 let rateAway = scoreAway[i].rating_away
//                 let resultAway = {
//                     result:'2',
//                     status: '2'
//                 }
//                 await scoreAway[i].update(resultAway)
//             }
//         }

//         let response = {
//             status: true,
//             message: "Result updated"
//         }
//         res.json(response)

//     }catch (err) {
//         let response = {
//             status: false,
//             message: "err: " + err
//         }
//         res.json(response)
//     }
// }

exports.allMatch = async (req, res) => {
    try {
        let match = await Matches.findAll()

        let response = {
            status: true,
            message: match
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