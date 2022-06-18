import {find, findById, create, update, remove } from '../models/productModel.js';
import { v4 as uuidv4, validate } from 'uuid';

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
        
        if(validate(id) === false) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'UUID is not correct'}))
        } else if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'User does not exist'}))
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
           
        })

        req.on('end', async ()=> {
            
            const { name, age, hobbies} = JSON.parse(body)
            if (name === undefined || age === undefined || hobbies === undefined) {
                res.writeHead(400, { 'Content-type': 'application/json'})
                res.end(JSON.stringify({message: 'body does not contain required fields'}))
            } else {
                const product = {
                    name,
                    age,
                    hobbies
                }
            
                const newProduct = await create(product);
                res.writeHead(201, { 'Content-type': 'application/json'})
                return res.end(JSON.stringify(newProduct))
            }
            
                
            
        })} catch(e){
         console.log(e)
    }
}

export const updateProduct = async (req, res, id)=> {
    const product = await findById(id);
    try{  
        if(validate(id) === false) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'UUID is not correct'}))
        } else if (!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'User does not exist'}))
        } else {
            
                let body  = '';
                req.on('data', (chunk)=> {
                    body += chunk.toString()
                    
                })
        
                req.on('end', async ()=> {
                   
                    const { name, age, hobbies} = JSON.parse(body)
        
                    const productData = {
                        name: name || product.name,
                        age: age || product.age,
                        hobbies: hobbies || product.hobbies
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
        if(validate(id) === false) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'UUID is not correct'}))
        } else if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'User not found'}))
        } else {
            await remove(id);
            res.writeHead(204, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
        
    } catch(e){
         console.log(e)
    }
}
