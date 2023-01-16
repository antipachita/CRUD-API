"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
const productController_1 = require("./controllers/productController");
require("dotenv/config");
const Port = process.env.PORT;
exports.server = http_1.default.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        (0, productController_1.getPrdocuts)(req, res);
    }
    else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        (0, productController_1.getProduct)(req, res, id);
    }
    else if (req.url === '/api/users' && req.method === 'POST') {
        (0, productController_1.createProduct)(req, res);
    }
    else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        (0, productController_1.updateProduct)(req, res, id);
    }
    else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        (0, productController_1.removeProduct)(req, res, id);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Rout Not Found' }));
    }
});
const PORT = process.env.PORT || Port || 5000;
exports.server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
