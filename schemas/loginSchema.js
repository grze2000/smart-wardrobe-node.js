module.exports = {
  username: {
    in: ['body'],
    isEmpty: {
      negated: true,
    },
    errorMessage: 'Enter your username',
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
    },
    errorMessage: 'Enter your login',
  }
}