"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = require("../services/categoryService");
const express_1 = __importDefault(require("express"));
const categoryRoute = express_1.default.Router();
categoryRoute.post("/", categoryService_1.createCategory);
categoryRoute.get("/", categoryService_1.getAllCategories);
categoryRoute.get("/:id", categoryService_1.getCategoryById);
categoryRoute.put("/:id", categoryService_1.updateCategory);
categoryRoute.delete("/:id", categoryService_1.deleteCategory);
exports.default = categoryRoute;
