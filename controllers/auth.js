
// const User = require('../models/User.js')


const jwt = require('jsonwebtoken')
// const DEFAULT_API = '9W-fP&Rvy?4sz5qz'

process.env.SECRET_KEY = 'secret'

function testFunction(username) {
}


function doesFormulaPayCustom(formulaType, result) {
  let doesPay = false
  let toBeLFR = result.replace('!', '')// => "Get rid of all ! with nothing"
  let lastFiveResults = toBeLFR.substr(toBeLFR.length - 5); // => "Tabs1"
  let formulaPrediction = '-';
  let arrTargetFormula = arrSingleFORMULAs[parseInt(formulaType)]
  if (arrTargetFormula !== undefined) {
    for (let i = 0; i < arrTargetFormula.length; i++) {
      let patternDataForm = arrTargetFormula[i]['data_form'].slice(0, -1) //get from key data_form, remove the last prediction
      if (lastFiveResults == patternDataForm) {
        doesPay = true
        formulaPrediction = arrTargetFormula[i]['data_form'].slice(-1)
        break
      }
    }
  }
  let jsonResults = {
    doesPay: doesPay,
    predict: formulaPrediction
  }

  return jsonResults
}
function doesntFormulaPay(formulaType, result) {
  let doesPay = false
  let toBeLFR = result.replace('!', '')// => "Get rid of all ! with nothing"
  let lastFiveResults = toBeLFR.substr(toBeLFR.length - 5); // => "Tabs1"
  let arrTargetFormula = arrSingleFORMULAs[parseInt(formulaType)]

  let arrpPatternDataForm = []

  if (arrTargetFormula !== undefined) {
    for (let i = 0; i < arrTargetFormula.length; i++) {
      let patternDataForm = arrTargetFormula[i] //get from key data_form, remove the last prediction ['data_form'].slice(0, -1)
      arrpPatternDataForm.push(patternDataForm)
      if (lastFiveResults == patternDataForm) {
        doesPay = true
        break
      }
    }
  }
  let failedData = {
    arrPDF: arrpPatternDataForm,
    formType: formulaType,
    lastfive: lastFiveResults,
    doesPay: doesPay
  }
  return failedData
}


function generateTOPUPCode() {
  var length = 10
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

//  MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER MEMBER
exports.registerMember = async (req, res) => {
  try {
    //first name
    let firstname = 'require_firstname'
    if (req.body.firstname !== undefined) {
      firstname = req.body.firstname.replace(/\W/g, '')
    }
    //last name
    let lastname = 'require_lastname'
    if (req.body.lastname !== undefined) {
      lastname = req.body.lastname.replace(/\W/g, '')
    }
    // phone
    let phone = '0000000000'
    if (req.body.phone !== undefined) {
      phone = req.body.phone.replace(/\W/g, '')
    }
    // email
    let email = 'require_email'
    if (req.body.email !== undefined) {
      email = req.body.email.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')
    }
    // lineid
    let lineid = 'require_lineid'
    if (req.body.lineid !== undefined) {
      lineid = req.body.lineid.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')
    }
    // reference
    let reference = ''
    if (req.body.reference !== undefined) {
      reference = req.body.reference.replace(/\W/g, '')
    } else {
      reference = "NO REFERENCE"
    }
    let newMemberInfo = {
      usr_name: req.body.username.replace(/\W/g, ''),
      usr_pass: req.body.password.replace(/\W/g, ''),
      type: -1,
      credit: parseInt(req.body.credit),
      first_name: firstname,
      last_name: lastname,
      usr_phone: phone,
      usr_email: email,
      usr_lineid: lineid,
      reference: reference,
    }
    // search if exist in DB or not
    let user = await User.findOne({
      where: {
        usr_name: newMemberInfo.usr_name
      }
    })
    if (user) { //  FOUND = Already Registered
      res.status(400).json({ message: "Duplicated Username or Phone Number", status: false })
    } else {
      try {
        User.create(newMemberInfo)
          .then(userResponse => {
            let logDetails = {
              action: 'Register',
              who_did: newMemberInfo.usr_name,
              for_whom: 'NONE',
              detail: 'Registered with JSON Data:' + newMemberInfo
            }
            ActionLog.create(logDetails)
            // Tell the FRONT-END of the success
            let response = {
              status: true,
              message: 'regsitered success'
            }
            res.json(response)
          })
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
  // res.send({ error: false, message: 'users list', data: users });
}

exports.respondMyNumber = async (req, res) => {
  try {
    let number = req.body.number
    let response = {
      status: true,
      message: "your number is " + number
    }

    res.json(response)

  } catch (err) {
    let response = {
      status: false,
      message: "err1:" + err
    }
    res.json(response)
  }
}



// getuserAll
//getUserByUsername

// additem

// item A = id 1  , item B : id = 2
// getItemAll
// getItemById