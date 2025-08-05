"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", product_controller_1.createProducts);
router.get("/", product_controller_1.getHomeProducts);
router.get("/all-products", product_controller_1.getAllProducts);
router.get("/:id", auth_middleware_1.authenticate, product_controller_1.getProductById);
exports.default = router;
//# sourceMappingURL=product.routes.js.map