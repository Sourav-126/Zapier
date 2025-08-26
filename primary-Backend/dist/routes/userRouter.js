"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types/types");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlewares_1 = __importDefault(require("../middlewares"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const parsedData = types_1.SignupData.safeParse(req.body);
    if (!parsedData.success) {
        console.log();
        res.status(411).json({
            message: "Dhang se bhar le na bhai ",
        });
    }
    const userExists = yield db_1.client.user.findFirst({
        where: {
            email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.email,
        },
    });
    if (userExists) {
        res.json({
            message: "User Already Exists",
        });
    }
    const newuUser = yield db_1.client.user.create({
        data: {
            name: ((_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.name) || "Anonymous",
            email: (_c = parsedData.data) === null || _c === void 0 ? void 0 : _c.email,
            password: (_d = parsedData.data) === null || _d === void 0 ? void 0 : _d.password,
        },
    });
    const token = jsonwebtoken_1.default.sign({ id: newuUser.id }, process.env.JWT_PASSWORD);
    res.json({
        token,
    });
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const parsedData = types_1.SigninData.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Dhang se bhar de laadle",
        });
    }
    const user = yield db_1.client.user.findFirst({
        where: {
            email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.email,
        },
    });
    if (!user) {
        res.send(" Sorry , Wrong Credentials");
    }
    const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_PASSWORD);
    res.json(token);
}));
exports.userRouter.get("/", middlewares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const user = yield db_1.client.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            email: true,
        },
    });
    return res.json({ user });
}));
