import http from 'http';
import { getPrdocuts, getProduct, createProduct, updateProduct, removeProduct } from './controllers/productController.js';
import 'dotenv/config';


const Port = process.env.PORT;

export const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getPrdocuts(req, res)
    } else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST'){
        createProduct(req, res)
    } else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3];
        updateProduct(req, res, id)
        
    } else if (req.url.match(/\/api\/users\/([0-z]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3];
        removeProduct(req, res, id)
        
    }else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Rout Not Found'}))
    }
    
})

const PORT = process.env.PORT || Port || 5000;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

