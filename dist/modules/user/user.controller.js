"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdController = exports.getLoggedInUserController = exports.getAllUsersController = exports.updatePasswordController = exports.loginController = exports.signupController = void 0;
const user_service_1 = require("./user.service");
const signupController = async (req, res) => {
    try {
        const { token, user } = await (0, user_service_1.signup)(req.body);
        res.status(201).json({ message: "Signup successful", token, user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.signupController = signupController;
const loginController = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        if (!emailOrPhone || !password) {
            return res.status(400).json({ error: 'Email or phone and password are required' });
        }
        const result = await (0, user_service_1.login)(emailOrPhone, password);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.loginController = loginController;
const updatePasswordController = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { email, name, phone, newPassword } = req.body;
        if (!userId)
            throw new Error("User ID is required");
        if (!newPassword)
            throw new Error("New password is required");
        const result = await (0, user_service_1.updatePasswordService)(userId, { email, name, phone, newPassword });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updatePasswordController = updatePasswordController;
// Fetch All Users (Admin Only)
const getAllUsersController = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden: Admins only" });
        }
        const users = await (0, user_service_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getAllUsersController = getAllUsersController;
//  Fetch Logged-in User Profile
const getLoggedInUserController = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await (0, user_service_1.getLoggedInUserService)(req.user.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};
exports.getLoggedInUserController = getLoggedInUserController;
const getUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await (0, user_service_1.getUserByIdService)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUserByIdController = getUserByIdController;
//# sourceMappingURL=user.controller.js.map