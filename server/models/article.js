'use strict';

const db = require('./database');
const Sequelize = require('sequelize');
//Zach - This all looks really good. I have no specific comments for this file. Good work.
// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get() {
      return this.getDataValue('tags').join(', ');
    },
  },
});

Article.prototype.truncate = function(length) {
  this.content = this.content.slice(0, length);
};

Article.findByTitle = title =>
  Article.findOne({
    where: {
      title,
    },
  });

Article.beforeUpdate(article => {
  article.version++;
});

Article.belongsTo(User, { as: 'author' });

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
