const express = require("express");
const routes = express.Router();
const authMiddleware = require("./app/middlewares/auth");

// Configurações para upar arquivos
const multer = require("multer");
const multerConfig = require("./config/multer");
const upload = multer(multerConfig);

// Controllers
const PostController = require("./app/controllers/PostController");
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");

routes.post("/auth/add-user", UserController.store);
routes.get("/post/posts", PostController.index);

routes.post("/auth/login", SessionController.store);

routes.use(authMiddleware);

routes.post("/post/add-post", upload.single("capaPost"), PostController.store);
routes.get("/post/:id", PostController.show);
routes.put(
  "/post/:id/update",
  upload.single("capaPost"),
  PostController.update
);
routes.delete("/post/:id/delete", PostController.delete);

module.exports = routes;
