var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { find, findById, create, update, remove } from '../models/productModel.js';
import { validate } from 'uuid';
export const getPrdocuts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield find();
        console.log('return array');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    }
    catch (e) {
        console.log(e);
    }
});
export const getProduct = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield findById(id);
        if (validate(id) === false) {
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
});
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
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
                const newProduct = yield create(product);
                res.writeHead(201, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(newProduct));
            }
        }));
    }
    catch (e) {
        console.log(e);
    }
});
export const updateProduct = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield findById(id);
    try {
        if (validate(id) === false) {
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
            req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                const { name, age, hobbies } = JSON.parse(body);
                const productData = {
                    name: name || product.name,
                    age: age || product.age,
                    hobbies: hobbies || product.hobbies
                };
                const updProduct = yield update(id, productData);
                res.writeHead(200, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(updProduct));
            }));
        }
    }
    catch (e) {
        console.log(e);
    }
});
export const removeProduct = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield findById(id);
        if (validate(id) === false) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UUID is not correct' }));
        }
        else if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        else {
            yield remove(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    }
    catch (e) {
        console.log(e);
    }
});
