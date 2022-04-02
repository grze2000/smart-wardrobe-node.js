exports.getClothes = (req, res) => {
  res.status(200).json({userId: req.user._id});
}