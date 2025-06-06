import express from "express";
import {createRecord, deleteRecord, getAllRecords, getRecordById, updateRecord} from "../services/recordService";

const recordRoute = express.Router();

recordRoute.post("/", createRecord);
recordRoute.get("/", getAllRecords);
recordRoute.get("/:id", getRecordById);
recordRoute.put("/:id", updateRecord);
recordRoute.delete("/:id", deleteRecord);

export default recordRoute;
