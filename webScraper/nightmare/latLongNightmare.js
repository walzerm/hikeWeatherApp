//run with node --harmony latLongNightmare.js
//Look for node request throttling library

var Nightmare = require('nightmare');
var vo = require('vo');
var fs = require('fs');
var knex = require('./db/knex');
var Sync = require('sync');


var arr = [];
function getData() {
    for (var i = 500; i <= 510; i++) {
        var url = knex('hikesInfo').where('id', i).select('url').then(function(data) {
            var url = data[0].url;
            runNightmare(url);
        })
    }
    console.log('finished get data');
}


function runNightmare(url) {

    vo(run)(function(err, result) {
      if (err) throw err;
    });

    function *run() {
        var temp = [];
        var nightmareShit = new Nightmare();
        var latLong = yield nightmareShit

            .goto(url)
            .evaluate(function() {

                return document.getElementsByClassName('latlong')[0].innerText;
            });

        temp.push(latLong);
        temp.push(url);
        yield nightmareShit.end();
        fs.appendFile('../rawData/latLongData.json', JSON.stringify(temp), 'utf8', function(err) {
            console.log('success');
        });
    }
}

getData();
