//Practice
//run with node --harmony nightmarePractice.js

var Nightmare = require('nightmare');
var vo = require('vo');
var fs = require('fs');

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
    var selectorOne = 'p';
    var selectorTwo = 'h1'
    var textArr = [];
    var url = 'https://www.reddit.com/r/all/';

    var urlExtensions = {
        0: '',
        1: '?count=25&after=t3_40ge4i'
    }

    Nightmare.action('elements', function(done) {
        this.evaluate_now(function() {
            var titles = document.getElementsByClassName('title may-blank ');
            var subreddits = document.getElementsByClassName('subreddit hover may-blank');
            strTitle = []
            strSubreddit = [];
            for (idx in titles) {
                strTitle.push(titles[idx].innerText);
            }
            for (idx1 in subreddits) {
                strSubreddit.push(subreddits[idx1].innerText);
            }
            return {
                titleElements: strTitle,
                subredditElements: strSubreddit
            }
        }, done)
    })

    var nightmare = Nightmare();
        for (var i = 0; i < 2; i++) {
            var p = yield nightmare
                .goto(url + urlExtensions[i])
                .elements()
                textArr.push(p);
        }

        yield nightmare.end();

    console.log(textArr);
    fs.readFile('./hikeData.json', function(err, data) {
        if (err) {
            console.log(err);
        }
    })
    fs.writeFile('./hikeData.json', JSON.stringify(textArr), function(err, data) {
        if (err) {
            console.log(err);
        }
    })
}


//Working one for wta
/*function *run() {
    var textArr = [];

    var nightmareText = Nightmare();
    var selector = 'listitem-title'
    for (var i = 0; i < 3330; i+=30) {
        var p = yield nightmareText
        .goto('http://www.wta.org/go-hiking/hikes?b_start:int=' + i + '&b_end:int=500')
        .evaluate(function(selector) {
            //Only a representation can be passed out of evaluate()
            //all processing must be done in the function
            var elements =  document.getElementsByClassName(selector);
            str = [];
            for(idx in elements) {
                str.push(elements[idx].innerText);
            }
            return str;
        }, selector);
        textArr.push(p);
    }

        //console.log(p);

        console.log(textArr);
        yield nightmareText.end();
}
*/
