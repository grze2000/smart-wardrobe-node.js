const { validationResult, matchedData } = require("express-validator");

exports.getClothes = (req, res) => {
  res.json(req.user.clothes);
}

exports.addClothes = (req, res) => {
  const errors = validationResult(req, {strictParams: ['body']});
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const data = matchedData(req);
  req.user.clothes.push({...data});
  req.user.save(err => {
    if(err) {
      res.status(500).json({message: 'Database error'});
    } else {
      res.sendStatus(201);
    }
  });
}