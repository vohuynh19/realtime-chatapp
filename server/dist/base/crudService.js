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
const lodash_1 = __importDefault(require("lodash"));
const configs_1 = require("../configs");
const helpers_1 = require("../helpers");
class CrudService {
    constructor(model) {
        this.model = model;
    }
    fetch(queryInput) {
        return __awaiter(this, void 0, void 0, function* () {
            queryInput = Object.assign({}, queryInput);
            const limit = queryInput.limit || configs_1.configs.query.limit;
            const skip = queryInput.offset || (queryInput.page - 1) * limit || 0;
            const order = queryInput.order;
            const search = queryInput.search;
            const query = this.model.find();
            if (search) {
                if (search.includes(" ")) {
                    lodash_1.default.set(queryInput, "filter.$text.$search", search);
                    query.select({ _score: { $meta: "textScore" } });
                    query.sort({ _score: { $meta: "textScore" } });
                }
                else {
                    const textSearchIndex = this.model.schema
                        .indexes()
                        .filter((c) => lodash_1.default.values(c[0]).some((d) => d == "text"));
                    if (textSearchIndex.length > 0) {
                        const or = [];
                        textSearchIndex.forEach((index) => {
                            Object.keys(index[0]).forEach((key) => {
                                or.push({ [key]: { $regex: search, $options: "i" } });
                            });
                        });
                        lodash_1.default.set(queryInput, "filter.$or", or);
                    }
                }
            }
            if (order) {
                query.sort(order);
            }
            if (queryInput.filter) {
                const filter = JSON.parse(JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`));
                query.setQuery(Object.assign({}, filter));
            }
            const countQuery = this.model.find().merge(query);
            query.limit(limit);
            query.skip(skip);
            if (queryInput.select) {
                query.select(queryInput.select);
            }
            return yield Promise.all([
                query.exec().then((res) => {
                    // console.timeEnd("Fetch");
                    return res;
                }),
                countQuery.count().then((res) => {
                    // console.timeEnd("Count");
                    return res;
                }),
            ]).then((res) => {
                return {
                    data: res[0],
                    total: res[1],
                    pagination: {
                        page: queryInput.page || 1,
                        limit: limit,
                        offset: skip,
                        total: res[1],
                    },
                };
            });
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find(options.filter || {});
            if (options.select) {
                query.select(options.select);
            }
            if (options.order) {
                query.sort(options.order);
            }
            query.limit(options.limit || configs_1.configs.query.limit);
            if (options.offset) {
                query.skip(options.offset);
            }
            return yield query.exec();
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(filter);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data);
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ _id: id }, data);
            let record = yield this.model.findOne({ _id: id });
            if (!record)
                throw helpers_1.ErrorHelper.mgRecoredNotFound();
            return record;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield this.model.findOne({ _id: id });
            if (!record)
                throw helpers_1.ErrorHelper.mgRecoredNotFound();
            yield record.remove();
            return record;
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.model.deleteMany({ _id: { $in: ids } });
            return result.deletedCount;
        });
    }
}
exports.CrudService = CrudService;
//# sourceMappingURL=crudService.js.map