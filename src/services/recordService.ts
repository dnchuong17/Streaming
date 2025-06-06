import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const { record } = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

const createRecord = async (req: Request, res: Response) => {
    const { fileUrl, startedAt, endedAt, roomId } = req.body;
    try {
        const newRecord = await record.create({
            data: { fileUrl, startedAt, endedAt, roomId }
        });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: "Error creating record", error });
    }
};

const getAllRecords = async (_req: Request, res: Response) => {
    try {
        const records = await record.findMany();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching records", error });
    }
};

const getRecordById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const foundRecord = await record.findUnique({ where: { id } });
        if (foundRecord) res.json(foundRecord);
        else res.status(404).json({ message: "Record not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching record", error });
    }
};

const updateRecord = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { fileUrl, startedAt, endedAt, roomId } = req.body;
    try {
        const updatedRecord = await record.update({
            where: { id },
            data: { fileUrl, startedAt, endedAt, roomId }
        });
        res.json(updatedRecord);
    } catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
};

const deleteRecord = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await record.delete({ where: { id } });
        res.json({ message: "Record deleted" });
    } catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
};

export {
    createRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
};
