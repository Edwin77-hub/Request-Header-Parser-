
var path = require('path');
const accepts = require('accepts');
var express = require('express');
const eua = require('express-useragent');
var app = express();



app.use(express.static('public'));
app.use(eua.express());


app.get("/", function (request, response) {
  response.redirect('/api/whoami');
  
});

app.get('/api/whoami', (req, res) => {
  let headers = accepts(req);
  res.json({
    "ipaddress": req.ip,
    "language": headers.languages()[0],
    "software": req.useragent && req.useragent.source ? req.useragent.source.match(/\(([^)]+)\)/)[1] : ""
  }).end();
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
