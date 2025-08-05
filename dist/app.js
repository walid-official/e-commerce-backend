"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const product_routes_1 = __importDefault(require("./modules/product/product.routes"));
const order_routes_1 = __importDefault(require("./modules/order/order.routes"));
const cart_routes_1 = __importDefault(require("./modules/cart/cart.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', () => {
    console.log("This is Main server");
});
app.use('/api/users', user_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map