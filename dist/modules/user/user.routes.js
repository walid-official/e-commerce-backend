"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/signup', user_controller_1.signupController);
router.post('/login', user_controller_1.loginController);
router.put("/update-password", auth_middleware_1.authenticate, user_controller_1.updatePasswordController);
router.get("/me", auth_middleware_1.authenticate, user_controller_1.getLoggedInUserController);
router.get("/", auth_middleware_1.authenticate, user_controller_1.getAllUsersController);
router.get("/:userId", user_controller_1.getUserByIdController);
exports.default = router;
//# sourceMappingURL=user.routes.js.map