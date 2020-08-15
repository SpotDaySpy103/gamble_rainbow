var CronJob = require('cron').CronJob;
const request = require('superagent');

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


(async () => {
    // where: {
    //     created: {
    //         $between: [dateStart, dateEnd]
    //     }
    // }
    console.log("start");
    new CronJob('*/2 * * * * *', async function () {
        request
            .post("http://localhost:3000/resultMatch")
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send()
            .then(response => {
                response.body
            })
            .catch(error => {
            })
        request
            .post("http://localhost:3000/updateStatus")
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send()
            .then(response => {
                response.body
            })
            .catch(error => {
            })
    }, null, true, 'America/Los_Angeles');
})();