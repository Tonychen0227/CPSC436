var express = require('express');
var router = express.Router();
const shortid = require('shortid');

var messages = [{"text": "Hello world",
  "id": shortid.generate(), "details": "Boo!"}, {"text": "Goodbye world",
  "id": shortid.generate(), "details": "Foo!"}]

/* GET users listing. */
router.get('/', function(req, res, next){
  res.json(messages);
});

router.post('/', function(req, res, next) {
  if (req.body.text == null || req.body.text == "") {
    res.status(500).send("You must include message text! E.g. {text: x, details: x}");
    return;
  }
  if (req.body.id == null) {
    req.body.id = shortid.generate();
  }
  messages.push(req.body);
  res.json(messages);
})

router.delete('/', function(req, res, next) {
  if (req.body == null || req.body.idToDelete == null) {
    messages = [];
  }
  else if (req.body.idToDelete != null){
    messages = messages.filter( (item) => item.id !== req.body.idToDelete)
  }
  res.json(messages);
})

router.put('/', function(req, res, next) {
  if (req.body.id == null) {
    res.status(500).send('You must include a id! E.g. {id: x, text: x, details: x}');
    return;
  }
  if (req.body.text == null || req.body.text == "") {
    res.status(500).send("You must include message text! E.g. {id: x, text: x, details: x}");
    return;
  }
  for (var x = 0; x < messages.length; x++) {
    if (messages[x].id == req.body.id) {
      messages[x].details = req.body.details;
      messages[x].text = req.body.text;
      break;
    }
  }
  res.json(messages);
})

module.exports = router;
