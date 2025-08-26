"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapSchema = exports.SigninData = exports.SignupData = void 0;
const zod_1 = require("zod");
exports.SignupData = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
exports.SigninData = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
exports.zapSchema = zod_1.z.object({});
