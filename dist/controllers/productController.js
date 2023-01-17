"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getPrdocuts = void 0;
const productModel_1 = require("../models/productModel");
const uuid_1 = require("uuid");
const getPrdocuts = async (req, res) => {
    try {
        const products = await (0, productModel_1.find)();
        console.log('return array');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    }
    catch (e) {
        console.log(e);
    }
};
exports.getPrdocuts = getPrdocuts;
const getProduct = async (req, res, id) => {
    try {
        const product = await (0, productModel_1.findById)(id);
        if ((0, uuid_1.validate)(id) === false) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UUID is not correct' }));
        }
        else if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User does not exist' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProduct = getProduct;
const createProduct = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { name, age, hobbies } = JSON.parse(body);
            if (name === undefined || age === undefined || hobbies === undefined) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'body does not contain required fields' }));
            }
            else {
                const product = {
                    name,
                    age,
                    hobbies
                };
                const newProduct = await (0, productModel_1.create)(product);
                res.writeHead(201, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(newProduct));
            }
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, id) => {
    const product = await (0, productModel_1.findById)(id);
    try {
        if ((0, uuid_1.validate)(id) === false) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UUID is not correct' }));
        }
        else if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User does not exist' }));
        }
        else {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const { name, age, hobbies } = JSON.parse(body);
                const productData = {
                    name: name || product.name,
                    age: age || product.age,
                    hobbies: hobbies || product.hobbies
                };
                const updProduct = await (0, productModel_1.update)(id, productData);
                res.writeHead(200, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(updProduct));
            });
        }
    }
    catch (e) {
        console.log(e);
    }
};
exports.updateProduct = updateProduct;
const removeProduct = async (req, res, id) => {
    try {
        const product = await (0, productModel_1.findById)(id);
        if ((0, uuid_1.validate)(id) === false) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UUID is not correct' }));
        }
        else if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        else {
            await (0, productModel_1.remove)(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    }
    catch (e) {
        console.log(e);
    }
};
exports.removeProduct = removeProduct;
