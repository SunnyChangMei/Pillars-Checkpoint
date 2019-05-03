'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get() {
      return this.getDataValue('article').join(', ');
    }
  }
});

Article.prototype.truncate = function(length) {
  this.content = this.content.slice(0, length);
};

Article.findByTitle = title => {
  return Article.findOne({
    where: {
      title
    }
  });
};

Article.beforeUpdate(() => {
  Article.version++;
})

Article.belongsTo(User, { as: 'author' });

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
