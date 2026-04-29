"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = exports.getProfile = void 0;
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const getProfile = async (req, res) => {
    const { userId } = req.user; // Attached by gateway auth but we should verify locally or just trust headers if internal
    try {
        const user = await db_1.default.user.findUnique({
            where: { id: userId },
            include: { profile: true }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.getProfile = getProfile;
const updatePreferences = async (req, res) => {
    const { userId } = req.user;
    const { preferences } = req.body;
    try {
        const profile = await db_1.default.profile.update({
            where: { userId },
            data: { preferences }
        });
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.updatePreferences = updatePreferences;
//# sourceMappingURL=userController.js.map