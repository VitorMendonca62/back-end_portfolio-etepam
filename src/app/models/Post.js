const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        autor: DataTypes.STRING,
        categoria: DataTypes.STRING,
        mensagem: DataTypes.STRING,
        path: DataTypes.STRING,
      },
      { sequelize }
    );
  }
}

module.exports = Post