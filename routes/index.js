const auth = require('../controllers/auth');
const matchesController = require('../controllers/matches')
const statusController = require('../controllers/status')
const userController = require('../controllers/user')
const betController = require('../controllers/bet')
const topUpController = require('../controllers/topupR6')

module.exports = app => {

    app.get('/', (req, res) => {
        res.json(`Test Ok`);
    });
    app.get('/upcomingMatchData', (req, res) => {
        res.json(`updateStatus`)
    })


    app.get('/keydex', function (req, res) {
        // res.sendFile(path.join(__dirname, '../public', '/index.html'));
    });

    app.post('/upcomingMatchData', matchesController.upcomingMatchData)
    app.post('/TestData', matchesController.TestData)
    app.post('/addMatch', matchesController.addMatch)
    app.post('/editMatch', matchesController.editMatch)
    app.post('/deleteMatch', matchesController.deleteMatch)
    app.post('/resultMatch', matchesController.resultMatch)
    app.post('/allMatch', matchesController.allMatch)

    app.post('/updateStatus', statusController.updateStatus)
    app.post('/statusMatch', statusController.statusMatch)
    app.post('/cancelMatch', statusController.cancelMatch)
    app.post('/userById', statusController.userById)

    app.post('/addUser', userController.addUser)
    app.post('/history', userController.history)
    app.post('/addAdmin', userController.addAdmin)

    app.post('/addBet', betController.addBet)

    app.post('/createTopup', topUpController.createTopup)
    app.post('/updateTopup', topUpController.updateTopup)
    
    // app.post('/checkHandStrength', pokerController.checkHandStrength)

    // app.get('/keydex/:keya/:keyb/:keyc', (req, res) => {
    //     var ref = req.params.ref
    //     let jsonAllKeys = {
    //         keya: req.params.keya,
    //         keyb: req.params.keyb,
    //         keyc: req.params.keyc
    //     }
    //     let queryKeyString = ''
    //     let countKeys = 0
    //     Object.keys(jsonAllKeys).forEach(function (key) { // loop for each key parameter
    //         if (countKeys !== 0) { // not the first time = 2+ key = add & symbol
    //             queryKeyString += '&'
    //         }
    //         // pattern is key=value &
    //         let value = jsonAllKeys[key]; // key value 
    //         let addPattern = key + '=' + value
    //         queryKeyString += addPattern
    //         // ...
    //     });
    //     res.redirect('/keydex?' + queryKeyString);
    // })

    // app.post('/login', auth.login)
    // app.get('/profile', auth.profile)
    // app.get('/requestBoss', auth.getBossHp)
    // app.get('/requestBoss', auth.getBossHp)

    // app.post('/responsePost', auth.responseToPost)
    // app.get('/getBonusRewardChart', auth.getBonusRewardChart)


    // app.post('/registerMember', auth.registerMember)
    // app.post('/extRegisterMember', auth.extRegisterMember)
    // app.post('/changePassword', auth.changePassword)

    // app.post('/authLogin', auth.authLogin)
    // app.post('/doLogout', auth.doLogout)

    // app.post('/getMemberInfo', auth.getMemberInfo)
    // app.post('/getMemberCredit', auth.getMemberCredit)


    // app.post('/topupCode', auth.topupCode)
    // app.post('/extTopupCode', auth.extTopupCode)
    // app.post('/topupLuckyWheel', auth.topupLuckyWheel)
    // app.post('/genrateTopupCode', auth.genrateTopupCode)
    // app.post('/extGenTopUpCredit', auth.genrateTopupCodeAPI)
    // app.post('/genrateNewFormula', auth.genrateNewFormula)
    // app.post('/getAllFormulaType', auth.getAllFormulaType)
    // app.get('/getContactData', auth.getContactData)


    // app.post('/getAllRooms', auth.getAllRooms)
    // app.post('/getAllRoomsG2', auth.getAllRoomsGameTwo)
    // app.post('/getAllRoomsG3', auth.getAllRoomsGameThree)
    // app.post('/getAllRoomsG4', auth.getAllRoomsGameFour)//
    // app.post('/requestRoomByName', auth.requestRoomByName)
    // app.post('/requestRoomByNameG2', auth.requestRoomByNameGameTwo)
    // app.post('/requestRoomByNameG3', auth.requestRoomByNameGameThree)
    // app.post('/requestRoomByNameG4', auth.requestRoomByNameGameFour)//
    // app.post('/getRoomWinLoseFormulaAll', auth.getRoomWinLoseFormulaAll)
    // app.post('/getRoomWinLoseFormulaAllG2', auth.getRoomWinLoseFormulaAllGameTwo)
    // app.post('/getRoomWinLoseFormulaAllG3', auth.getRoomWinLoseFormulaAllGameThree)
    // app.post('/getRoomWinLoseFormulaAllG4', auth.getRoomWinLoseFormulaAllGameFour)//
    // app.post('/getRoomWinLoseFormula', auth.getRoomWinLoseFormula)
    // app.post('/getRoomWinLoseFormulaG2', auth.getRoomWinLoseFormulaGameTwo)
    // app.post('/getRoomWinLoseFormulaG3', auth.getRoomWinLoseFormulaGameThree)
    // app.post('/getRoomWinLoseFormulaG4', auth.getRoomWinLoseFormulaGameFour)//
    // app.post('/requestCustomRoom', auth.requestCustomGuideRoom)//

    // app.post('/payRoomFee', auth.payRoomFee)
    // app.post('/payRoomFeeG2', auth.payRoomFeeGameTwo)
    // app.post('/payRoomFeeG3', auth.payRoomFeeGameThree)
    // app.post('/payRoomFeeG4', auth.payRoomFeeGameFour)//

    // app.post('/byAdminAllUsers', auth.byAdminAllUsers)
    // app.post('/byAdminSelfFoundUsers', auth.byAdminSelfFoundUsers)
    // app.post('/byAdminSearchUsername', auth.byAdminSearchUsername)
    // app.post('/extSearchUsername', auth.extSearchUsername)
    // app.post('/byAdminRegisterMember', auth.byAdminRegisterMember)
    // app.post('/byAdminRegisterMemberLoop', auth.byAdminRegisterMemberLoop)
    // app.post('/byAdminToggleBan', auth.byAdminToggleBan)
    // app.post('/byAdminChangePassword', auth.byAdminChangePassword)
    // app.post('/extChangePassword', auth.extChangePassword)
    // app.post('/byAdminDeleteFormula', auth.byAdminDeleteFormula)

    // app.post('/byOwnerRegisterAdmin', auth.byOwnerRegisterAdmin)
    // app.post('/byOwnerChangeContact', auth.byOwnerChangeContact)

    // app.post('/botUpdateServer', auth.botUpdateServer)
    // app.post('/botUpdateServerG2', auth.botUpdateServerGameTwo)
    // app.post('/botUpdateServerG3', auth.botUpdateServerGameThree)
    // app.post('/botUpdateServerG4', auth.botUpdateServerGameFour)
    // app.post('/pmf10', auth.permuteFormula10)



    // app.post('/DepositBAY', autoDeposit.depositBay)
    // app.post('/DepositSCB', autoDeposit.depositScb)
    // app.post('/DepositKBANK', autoDeposit.depositKbank)

};
