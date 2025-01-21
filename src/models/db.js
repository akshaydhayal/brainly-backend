"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contents: [{ type: mongoose_1.default.Types.ObjectId, ref: "Content", default: [] }]
});
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['tweet', 'youtube', 'document', 'link'], required: true },
    link: { type: String, required: true },
    tags: [String]
});
const shareSchema = new mongoose_1.default.Schema({
    link: String,
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
exports.ContentModel = mongoose_1.default.model('Content', contentSchema);
