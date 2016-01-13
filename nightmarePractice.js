var Nightmare = require('nightmare');
var vo = require('vo');
 
vo(function* () {
  var nightmare = Nightmare({ show: true });
  var link = yield nightmare
    .goto('https://www.reddit.com/r/BayAreaHikes/')
    .click('.title.may-blank')
    .evaluate(function () {
      return document.getElementsByClassName('title.may-blank');
    });
    

  yield nightmare.end();
  return link;
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});