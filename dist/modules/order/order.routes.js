"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, order_controller_1.createOrderController);
router.get("/", auth_middleware_1.authenticate, order_controller_1.getUserOrdersController);
router.get("/all", auth_middleware_1.authenticate, order_controller_1.getAllOrdersController);
router.get("/:orderId", auth_middleware_1.authenticate, order_controller_1.getOrderByOrderIdController);
exports.default = router;
//# sourceMappingURL=order.routes.js.map