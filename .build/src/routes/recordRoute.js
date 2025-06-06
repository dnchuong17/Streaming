"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordService_1 = require("../services/recordService");
const recordRoute = express_1.default.Router();
recordRoute.post("/", recordService_1.createRecord);
recordRoute.get("/", recordService_1.getAllRecords);
recordRoute.get("/:id", recordService_1.getRecordById);
recordRoute.put("/:id", recordService_1.updateRecord);
recordRoute.delete("/:id", recordService_1.deleteRecord);
exports.default = recordRoute;
