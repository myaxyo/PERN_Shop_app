const Router = require("express");
const { create, getAll } = require("../controllers/typeController");
const router = new Router();
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post("/", checkRole("ADMIN"), create);
router.get("/", getAll);

module.exports = router;
