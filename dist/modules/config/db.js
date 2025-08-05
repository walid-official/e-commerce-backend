"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.config = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load .env variables
// Create Mongo URI safely
const mongoURI = process.env.DB_USER && process.env.DB_PASS && process.env.DB_NAME
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    : process.env.MONGO_LOCAL_URI;
if (!mongoURI) {
    throw new Error('❌ MongoDB URI not provided in environment variables');
}
exports.config = {
    port: process.env.PORT || 5000,
    mongoURI,
};
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(exports.config.mongoURI);
        console.log('✅ MongoDB Connected');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit process on failure
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map