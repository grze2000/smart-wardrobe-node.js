const { CLOTHES_TYPES } = require("../enums/clothesTypes");
const { COLORS } = require("../enums/colors");
const { MATERIAL_THICKNESS } = require("../enums/materialThickness");

module.exports = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Enter clothes name',
    },
    isAlphanumeric: {
      errorMessage: 'Name can contain only letters and numbers',
      options: ['pl-PL', {ignore: '- '}],
    }
  },
  description: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isAlphanumeric: {
      errorMessage: 'Name can contain only letters and numbers',
      options: ['pl-PL'],
    }
  },
  type: {
    in: ['body'],
    isIn: {
      options: [Object.values(CLOTHES_TYPES)],
      errorMessage: 'Incorrect clothes type',
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Missing clothes type',
    },
  },
  materialThickness: {
    in: ['body'],
    isIn: {
      options: [Object.values(MATERIAL_THICKNESS)],
      errorMessage: 'Incorrect material thickness',
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Missing material thickness',
    },
  },
  colors: {
    in: ['body'],
    optional: { options: { nullable: true } },
    custom: {
      options: (value, { req }) => {
        return Array.isArray(value) && value.every(x => Object.values(COLORS).includes(x));
      },
      errorMessage: 'Incorrect color',
    },
  },
  inWash: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isBoolean: {}
  },
  inWardrobe: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isBoolean: {}
  },
  purchaseDate: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isISO8601: {
      errorMessage: 'Incorrect purchase date',
    }
  },
  value: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isFloat: {
      options: [{min: 0}],
    },
  },
  tagId: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isString: {}
  }
}