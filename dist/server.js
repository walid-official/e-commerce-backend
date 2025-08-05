"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./modules/config/db");
const startServer = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(db_1.config.port, () => {
        console.log(`🚀 Server running on port ${db_1.config.port}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map