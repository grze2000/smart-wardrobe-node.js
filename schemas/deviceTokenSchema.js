module.exports = {
  name: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isAlphanumeric: {
      errorMessage: 'Name can contain only letters and numbers',
      options: ['pl-PL'],
    },
    isLength: {
      options: {max: 20},
      errorMessage: 'Name cannot be longer than 20 characters',
    },
  },
}