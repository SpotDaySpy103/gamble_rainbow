const user_id = '2'

// function ajaxListMatch(act) {
//     $.ajax({
//         url: "http://localhost:3000/userById",
//         method: 'POST'
//         // data: {}
//     }).done(function (responce) {
//         // alert('Success')

//         // console.log(responce);
//         if (responce.status) {

//         }
//     });
// }

function ajaxBetHistory() {
    $.ajax({
        url: "http://localhost:3000/history",
        method: 'POST',
        data: {
            user_id: user_id
        }
    }).done(function (response) {
        // alert('Success')
        // console.log(response);

        document.getElementById('list-bet-history').innerHTML = listBetHistory(response.message)
    });
}

function ajaxUserId() {
    $.ajax({
        url: "http://localhost:3000/userById",
        method: 'POST',
        data: {
            user_id: user_id
        }
    }).done(function (responce) {
        // alert('Success')

        document.getElementById('balance').innerHTML = responce.message.user_credit
    });
}



function ajaxListMatch(act) {
    $.ajax({
        url: "http://localhost:3000/allMatch",
        method: 'POST'
        // data: {}
    }).done(function (responce) {
        // alert('Success')

        // console.log(responce);
        if (responce.status) {
            let html = ''
            switch (act) {
                case 'live':
                    html = listLiveMatch(responce.message);
                    setClassBtn(0)
                    break;
                case 'finished':
                    html = listFinishMatch(responce.message);
                    setClassBtn(2)
                    break;
                case 'coming':
                    html = listComingMatch(responce.message);
                    setClassBtn(1)
                    break;
            }
            document.getElementById('list-match').innerHTML = html
        }
    });
}

function listBetHistory(user) {
    let html = ''
    user.forEach(el => {
        html +=
            `
        <tr>
            <td>${el.matches_id}</td>
            <td>${el.bet_team}</td>
            <td>${el.bet_money}</td>
            <td>${el.status}</td>
        </tr>
        `
    });
    return html
}

function listFinishMatch(matchData) {
    let html = ''
    matchData.filter(el => el.status == '2').forEach(el => {
        html +=
            `
        <tr>
            <td>
                <div>${el.team_home}</div>
                <div>${el.score_home}</div>
            </td>
            <td>
                <div>${el.team_away}</div>
                <div>${el.score_away}</div>
            </td>
            <td>${el.youtube_link}</td>
            <td>${el.twitch_link}</td>
            <td>${el.result}</td>
        </tr>
        `
    });
    return html
}

function listLiveMatch(matchData) {
    let html = ''
    matchData.filter(el => el.status == '1').forEach(el => {
        html +=
            `
        <tr>
            <td>
                <div>${el.team_home}</div>
                <div>${el.score_home}</div>
            </td>
            <td>
                <div>${el.team_away}</div>
                <div>${el.score_away}</div>
            </td>
            <td>${el.youtube_link}</td>
            <td>${el.twitch_link}</td>
        </tr>
        `
    });
    return html
}

function listComingMatch(matchData) {
    let html = ''
    matchData.filter(el => el.status == '0').forEach(el => {
        html +=
            `
        <tr>
            <td>
                <div>${el.team_home}</div>
                <div>${el.score_home}</div>
            </td>
            <td>
                <div>${el.team_away}</div>
                <div>${el.score_away}</div>
            </td>
            <td>${el.youtube_link}</td>
            <td>${el.twitch_link}</td>
            <td>
                <button class="btn btn-primary" onclick="callModalBet('${el.team_home}','${el.team_away}','${el.matches_id}')">Choose Team</button>
            </td>
        </tr>
        `
    });
    return html
}

function setClassBtn(num) {
    let color = ["danger", "secondary", "success"]
    let btn = document.getElementById('btn-section').querySelectorAll('button')
    // console.log(btn);
    btn.forEach((el, i) => {
        el.setAttribute('class', `btn btn-outline-${color[i]} px-3`)
    })
    btn[num].setAttribute('class', `btn btn-${color[num]} px-3`)
}

function callModalBet(home, away, _matches_id) {
    document.getElementById('team_home').innerHTML = home
    document.getElementById('team_away').innerHTML = away
    document.getElementById('payment').setAttribute("onclick", `bet('${_matches_id}')`);
    $('#modal-bet').modal('toggle')
    console.log(home, away);
}

function checkBetAmont(amount) {
    if (amount <= 300) {
        return 300
    } else if (amount >= 10000) {
        return 10000
    }
    return amount
}

function selectTeam(element) {
    document.getElementsByName('team-select').forEach(el => el.classList.remove('active'))
    element.classList.add('active')
}

function bet(_matches_id) {
    let seleted
    document.getElementsByName('team-select').forEach(el => {
        if (el.classList.contains('active')) {
            seleted = el
        }

    })
    if (seleted == undefined) return false
    let input = seleted.querySelector('input')
    let dataSend = {
        user_id: user_id,
        matches_id: _matches_id,
        bet_team: input.id,
        bet_money: input.value
    }
    $.ajax({
        url: "http://localhost:3000/addBet",
        method: 'POST',
        data: dataSend
    }).done(function (responce) {
        alert(JSON.stringify(responce))
    });
}