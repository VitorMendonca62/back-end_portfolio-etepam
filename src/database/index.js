const Sequelize = require("sequelize");
const configDatabase = require("../config/database");

const connection = new Sequelize(configDatabase);

const Post = require("../app/models/Post");
const User = require("../app/models/User");

const models = [Post, User];

connection
  .authenticate()
  .then(() => console.log("Database rodando com sucesso"))
  .catch((err) => `Erro: ${err}`);
module.exports = connection;

models.forEach((model) => model.init(connection));

module.exports = connection;
