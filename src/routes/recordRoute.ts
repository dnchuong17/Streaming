import express from "express";
import {
    createRecord,
    deleteRecord,
    getAllRecords,
    getRecordById,
    stopRecording,
    updateRecord
} from "../services/recordService";

const recordRoute = express.Router();

// @ts-ignore
recordRoute.post("/", createRecord);
// @ts-ignore
recordRoute.post("/egress/stop", stopRecording);
recordRoute.get("/", getAllRecords);
recordRoute.get("/:id", getRecordById);
recordRoute.put("/:id", updateRecord);
recordRoute.delete("/:id", deleteRecord);

export default recordRoute;
