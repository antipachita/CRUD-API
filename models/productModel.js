import array from '../data/products.json' assert { type: "json" };
import { v4 as uuidv4 } from 'uuid';
let data = array;
export const find = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};
export const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = data.find((p) => p.id === id);
        resolve(product);
    });
};
export const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = Object.assign({ id: uuidv4() }, product);
        data.push(newProduct);
        // writeDataToFile('./data/products.json', data)
        resolve(newProduct);
    });
};
export const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex((p) => p.id == id);
        data[index] = Object.assign({ id }, product);
        resolve(data[index]);
    });
};
export const remove = (id) => {
    return new Promise((resolve, reject) => {
        data = data.filter((p) => p.id !== id);
        resolve('User remove');
    });
};
