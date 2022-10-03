const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");

module.exports = {
  async index(req, res) {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  },

  async store(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(404).json();
    }

    const { titulo, autor, mensagem, categoria } = req.body;
    const path = (await req.file.filename)
      ? "/uploads/" + req.file.filename
      : null;

    const post = await Post.create({
      titulo,
      autor,
      mensagem,
      categoria,
      path,
    });
    return res.status(201).json(post);
  },

  async show(req, res) {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    return res.status(200).json(post);
  },

  async update(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(404).json();
    }

    const { id } = req.params;

    const { titulo, autor, mensagem, categoria } = req.body;
    const path = (await req.file.filename)
      ? "/uploads/" + req.file.filename
      : null;

    await Post.update(
      {
        titulo,
        autor,
        mensagem,
        categoria,
        path,
      },
      { where: { id } }
    );
    const post = await Post.findByPk(id);

    return res.status(201).json(post);
  },

  async delete(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(404).json();
    }
    const { id } = req.params;
    const post = await Post.findByPk(id);

    await Post.destroy({ where: { id } });

    if (!post) {
      return res.status(404).json({ msg: "Post já excluido" });
    }
    fs.unlink(path.resolve(__dirname + "/../../../" + post.path), (err) => {
      if (err) console.log("Erro deletar foto post:" + err);
      else console.log("Arquivo deletado");
    });

    return res.status(201).json(post);
  },
};
