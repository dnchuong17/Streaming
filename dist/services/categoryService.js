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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const { category } = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"]
});
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newCategory = yield category.create({
            data: { name },
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category.findMany({
            include: { rooms: true },
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const categoryData = yield category.findUnique({
            where: { id },
            include: { rooms: true },
        });
        if (categoryData)
            res.json(categoryData);
        else
            res.status(404).json({ message: 'Category not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    try {
        const updatedCategory = yield category.update({
            where: { id },
            data: { name },
        });
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(404).json({ message: 'Category not found', error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield category.delete({ where: { id } });
        res.json({ message: 'Category deleted' });
    }
    catch (error) {
        res.status(404).json({ message: 'Category not found', error });
    }
});
exports.deleteCategory = deleteCategory;
