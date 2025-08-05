"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/add", auth_middleware_1.authenticate, cart_controller_1.addToCart);
router.get("/all-users", cart_controller_1.getAllCartsForUsers);
router.get("/:userId", cart_controller_1.getUserAllCarts);
router.patch("/update-quantity", cart_controller_1.updateCartItemQuantity);
router.delete("/remove", auth_middleware_1.authenticate, cart_controller_1.removeCartItem);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map