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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const events_1 = __importDefault(require("events"));
class CrudService extends events_1.default {
    constructor(model) {
        super();
        this.model = model;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            return yield query.exec().then((res) => {
                this.emit("findAll", res);
                return res;
            });
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(filter).then((res) => {
                this.emit("findOne", res, filter);
                return res;
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data).then((res) => {
                this.emit("create", res, data);
                return res;
            });
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ _id: id }, data);
            const record = yield this.model.findOne({ _id: id });
            this.emit("updateOne", record, data);
            return record;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.model.findOne({ _id: id });
            yield record.remove();
            this.emit("deleteOne", record);
            return record;
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.deleteMany({ _id: { $in: ids } });
            this.emit("deleteMany", result.deletedCount, ids);
            return result.deletedCount;
        });
    }
}
exports.CrudService = CrudService;
//# sourceMappingURL=crudService.js.map