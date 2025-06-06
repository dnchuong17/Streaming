import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../services/categoryService";
import express from "express";


const categoryRoute = express.Router();

categoryRoute.post("/", createCategory);
categoryRoute.get("/", getAllCategories);
categoryRoute.get("/:id", getCategoryById);
categoryRoute.put("/:id", updateCategory);
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;
