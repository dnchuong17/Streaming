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
exports.deleteRecord = exports.updateRecord = exports.getRecordById = exports.getAllRecords = exports.createRecord = void 0;
const client_1 = require("@prisma/client");
const { record } = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"]
});
const createRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileUrl, startedAt, endedAt, roomId } = req.body;
    try {
        const newRecord = yield record.create({
            data: { fileUrl, startedAt, endedAt, roomId }
        });
        res.status(201).json(newRecord);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating record", error });
    }
});
exports.createRecord = createRecord;
const getAllRecords = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield record.findMany();
        res.json(records);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching records", error });
    }
});
exports.getAllRecords = getAllRecords;
const getRecordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const foundRecord = yield record.findUnique({ where: { id } });
        if (foundRecord)
            res.json(foundRecord);
        else
            res.status(404).json({ message: "Record not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching record", error });
    }
});
exports.getRecordById = getRecordById;
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { fileUrl, startedAt, endedAt, roomId } = req.body;
    try {
        const updatedRecord = yield record.update({
            where: { id },
            data: { fileUrl, startedAt, endedAt, roomId }
        });
        res.json(updatedRecord);
    }
    catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
});
exports.updateRecord = updateRecord;
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield record.delete({ where: { id } });
        res.json({ message: "Record deleted" });
    }
    catch (error) {
        res.status(404).json({ message: "Record not found", error });
    }
});
exports.deleteRecord = deleteRecord;
