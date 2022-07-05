module.exports = (router) => {
    const userController = require("../controllers/user.controller");

    router.post("/signup", userController.signUp);
    router.post("/login", userController.login);
    router.post("/logout", userController.logout);


    
    router.get("/coupons", userController.getCouponCode);
    router.put("/bookshow", userController.bookShow);
    return router;
  } 