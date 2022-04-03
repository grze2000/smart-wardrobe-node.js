const jwt = require('jsonwebtoken');

exports.getDeviceTokens = (req, res) => {
  res.json(req.user.deviceTokens);
}

exports.createDeviceToken = (req, res) => {
  const deviceToken = jwt.sign({
    id: req.user._id,
    name: req.body?.name,
  }, process.env.DEVICE_TOKEN_SECRET);
  req.user.deviceTokens.push({
    token: deviceToken,
    name: req.body?.name,
  });
  req.user.save(err => {
    if(err) {
      res.status(500).json({message: 'Database error'});
    } else {
      res.status(201).json(req.user.deviceTokens?.length ? req.user.deviceTokens[req.user.deviceTokens.length-1] : null);
    }
  });
}

exports.deleteDeviceToken = (req, res) => {
  req.user.deviceTokens = req.user.deviceTokens.filter(token => token._id.toString() === req.params.id);
  req.user.save(err => {
    if(err) {
      res.status(500).json({message: 'Database error'});
    } else {
      res.sendStatus(200);
    }
  });
}