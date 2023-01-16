import array from '../data/products.json';
import { v4 as uuidv4, validate } from 'uuid';

type ExistingUser = {
    id: string
    age: string | number
   name: string | number
   hobbies: any
}
let data:Array<ExistingUser> = array;

export const find = () => {
    return new Promise((resolve, reject) => {
        resolve(data)
    }) 
}

export const findById = (id:any) => {
    return new Promise((resolve, reject) => {
        
        const product:any = data.find((p)=> p.id === id);
        resolve(product)
    }) 
}

export const create = (product:any) => {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(),...product};
        data.push(newProduct);
        // writeDataToFile('./data/products.json', data)
        resolve(newProduct)
    }) 
}

export const update = (id:any, product:any) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex((p) => p.id == id);
        data[index] = {id, ...product}
        resolve( data[index])
    }) 
}

export const remove = (id:any) => {
    return new Promise((resolve, reject) => {
        data = data.filter((p)=> p.id!== id)
        
        resolve('User remove')
    }) 
}