"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeNotFoundHandler = (req, res) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
        error: {
            name: "404 Not found",
            message: "The requested route does not exist on the server",
            path: req.originalUrl,
            method: req.method,
        },
    });
};
exports.default = routeNotFoundHandler;
//# sourceMappingURL=routeNotFoundHandler.js.map