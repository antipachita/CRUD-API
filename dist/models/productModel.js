"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.find = void 0;
const products_json_1 = __importDefault(require("../data/products.json"));
const uuid_1 = require("uuid");
let data = products_json_1.default;
const find = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};
exports.find = find;
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = data.find((p) => p.id === id);
        resolve(product);
    });
};
exports.findById = findById;
const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = { id: (0, uuid_1.v4)(), ...product };
        data.push(newProduct);
        // writeDataToFile('./data/products.json', data)
        resolve(newProduct);
    });
};
exports.create = create;
const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex((p) => p.id == id);
        data[index] = { id, ...product };
        resolve(data[index]);
    });
};
exports.update = update;
const remove = (id) => {
    return new Promise((resolve, reject) => {
        data = data.filter((p) => p.id !== id);
        resolve('User remove');
    });
};
exports.remove = remove;
