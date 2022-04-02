module.exports = {
  token: {
    in: ['body'],
    isEmpty: {
      negated: true,
    },
    errorMessage: 'Token not found',
  },
}