const Router = require("express");
const { registor, login, auth } = require("../controllers/userController");
const router = new Router();
const authMiddleware = require("../middleware/AuthHandlingMIddleware");

router.post("/registor", registor);
router.post("/login", login);
router.get("/auth", authMiddleware, auth);

module.exports = router;
