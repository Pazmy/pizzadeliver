const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const orderController = require("../app/http/controllers/customer/orderController");
const adminController = require("../app/http/controllers/admin/adminController");

//middleware
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/logout", authController().logout);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  //customer routes
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);

  //Admin routes
  app.get("/admin/orders", admin, adminController().index);
}

module.exports = initRoutes;
