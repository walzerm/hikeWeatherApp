//Practice
//run with node --harmony nightmarePractice.js

var Nightmare = require('nightmare');
var vo = require('vo');

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
    var selectorOne = 'p';
    var selectorTwo = 'h1'
    var textArr = [];
    var url = 'http://www.search-seo-engine-optimization.com/';

    var urlExtensions = {
        0: '',
        1: 'seattle/pay-per-click-advertising-ppc.html'
    }

    Nightmare.action('elements', function(done) {
        this.evaluate_now(function() {
            var p = document.getElementsByTagName('p');
            var h1 = document.getElementsByTagName('h1');
            strP = []
            strh1 = [];
            for (idx in p) {
                strP.push(p[idx].innerText);
            }
            for (idx in h1) {
                strh1.push(h1[idx].innerText);
            }
            return {
                pElements: strP,
                h1Elements: strh1
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
