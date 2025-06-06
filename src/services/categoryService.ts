import { Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";


const { category } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newCategory = await category.create({
            data: { name },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await category.findMany({
            include: { rooms: true },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

const getCategoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const categoryData = await category.findUnique({
            where: { id },
            include: { rooms: true },
        });
        if (categoryData) res.json(categoryData);
        else res.status(404).json({ message: 'Category not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

const updateCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    try {
        const updatedCategory = await category.update({
            where: { id },
            data: { name },
        });
        res.json(updatedCategory);
    } catch (error) {
        res.status(404).json({ message: 'Category not found', error });
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await category.delete({ where: { id } });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Category not found', error });
    }
};

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
