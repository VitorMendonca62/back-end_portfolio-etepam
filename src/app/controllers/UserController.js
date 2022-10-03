// Colocar uma pagina para cadastro de admin


const User = require("../models/User");
module.exports = {
  async store(req, res) {
    // let admin = false;
    let admin = true;
    const {
      nome,
      email,
      password,
      password_hash,
      telefone,
      matricula,
      ensino,
      serie,
      curso,
    } = await req.body;

    const isUser =
      (await User.findOne({ where: { matricula } })) ||
      (await User.findOne({ where: { email } }));

    if (isUser) {
      return res.status(422).json({ msg: "Usuário já criado, tente fazer login" });
    } else {
      const user = await User.create({
        nome,
        email,
        password,
        password_hash,
        telefone,
        matricula,
        ensino,
        serie,
        curso,
        admin,
      });
      return res.status(201).json({ msg: "Usuário criado com sucesso" });
    }
  },

  async show(req, res) {
    const { id } = req.body;
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  },
};
