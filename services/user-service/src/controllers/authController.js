"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await db_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                profile: {
                    create: {
                        preferences: {}
                    }
                }
            }
        });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '24h' });
        res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map