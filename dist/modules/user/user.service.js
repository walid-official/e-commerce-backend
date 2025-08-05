"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdService = exports.getLoggedInUserService = exports.getAllUsersService = exports.updatePasswordService = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = require("./User.model");
const jwt_1 = require("../utils/jwt");
const mongoose_1 = __importDefault(require("mongoose"));
const SALT_ROUNDS = 10;
const signup = async (userData) => {
    const { name, email, phone, password } = userData;
    const existingUser = await User_model_1.User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser)
        throw new Error("Email or Phone already registered");
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const user = new User_model_1.User({ name, email, phone, password: hashedPassword });
    await user.save();
    const token = (0, jwt_1.generateToken)({ id: user._id, role: user.role });
    return { token, user };
};
exports.signup = signup;
const login = async (emailOrPhone, password) => {
    const user = await User_model_1.User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user)
        throw new Error('User not found');
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = (0, jwt_1.generateToken)({ id: user._id, role: user.role });
    return { token, user };
};
exports.login = login;
const updatePasswordService = async (userId, data) => {
    const user = await User_model_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    // Update password
    const hashedPassword = await bcrypt_1.default.hash(data.newPassword, SALT_ROUNDS);
    user.password = hashedPassword;
    // Update other fields if provided
    if (data.email)
        user.email = data.email;
    if (data.name)
        user.name = data.name;
    if (data.phone)
        user.phone = data.phone;
    await user.save();
    return { message: "User information updated successfully" };
};
exports.updatePasswordService = updatePasswordService;
// Fetch all users (for admin)
const getAllUsersService = async () => {
    return await User_model_1.User.find().select("-password");
};
exports.getAllUsersService = getAllUsersService;
// Fetch logged-in user (by ID)
const getLoggedInUserService = async (userId) => {
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    return await User_model_1.User.findById(userObjectId).select("-password");
};
exports.getLoggedInUserService = getLoggedInUserService;
const getUserByIdService = async (userId) => {
    const user = await User_model_1.User.findById(userId).select("-password");
    return user;
};
exports.getUserByIdService = getUserByIdService;
//# sourceMappingURL=user.service.js.map