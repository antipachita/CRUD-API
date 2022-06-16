import {find, findById, create, update, remove } from '../models/productModel.js';

export const getPrdocuts = async (req, res)=> {
    try{ 
        const products = await find();

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch(e){
         console.log(e)
    }
}

export const getProduct = async (req, res, id)=> {
    try{ 
        const product = await findById(id);

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
        
    } catch(e){
         console.log(e)
    }
}

export const createProduct = async (req, res)=> {
    try{  
        let body  = '';
        req.on('data', (chunk)=> {
            body += chunk.toString()
            console.log(body)
        })

        req.on('end', async ()=> {
            console.log(JSON.parse(body))
            const { title, description, price} = JSON.parse(body)

            const product = {
                title,
                description,
                price
            }

            const newProduct = await create(product);

            res.writeHead(201, { 'Content-type': 'application/json'})
            return res.end(JSON.stringify(newProduct))
        })

        
    } catch(e){
         console.log(e)
    }
}

export const updateProduct = async (req, res, id)=> {
    const product = await findById(id);
    try{  
        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            
                let body  = '';
                req.on('data', (chunk)=> {
                    body += chunk.toString()
                    console.log(body)
                })
        
                req.on('end', async ()=> {
                    console.log(JSON.parse(body))
                    const { title, description, price} = JSON.parse(body)
        
                    const productData = {
                        title: title || product.title,
                        description: description || product.description,
                        price: price || product.price
                    }
        
                    const updProduct = await update(id, productData);
                    res.writeHead(200, { 'Content-type': 'application/json'})
                    return res.end(JSON.stringify(updProduct))
                });
            }
            
        }catch(e) {
            console.log(e)
        }
    
}


export const removeProduct = async (req, res, id)=> {
    try{ 
        const product = await findById(id);

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            await remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
        
    } catch(e){
         console.log(e)
    }
}
