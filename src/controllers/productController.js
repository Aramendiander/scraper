import Product from '../models/productModel.js';
import Scraper from '../utils/scraper.js';
import Parser from '../utils/parser.js';

const getAllProducts =  () => {
    return  Product.find();
}

const getProductById = (id) => {
    return Product.findById(id);
}

const createProduct = async(nombre, imagen, precio) => {
    const newProduct = {
        nombre,
        imagen,
        precio
    };
    const product =new Product(newProduct);
    await product.save();
    return product;

}

const updateProduct = async (id, nombre, imagen, precio) => {
    const product = await getProductById(id);
    product.nombre = nombre;
    product.imagen = imagen;
    product.precio = precio;
    product.save();
    return product;
}

const deleteProduct = async(id) => {
    const product = await getProductById(id);
    await Product.deleteOne({_id: id});
    return product;
}

const scrapProducts = async() =>{
    const url = "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059872-fiambres-y-cocidos/";
    const scraper = new Scraper();
    await scraper.promise;
    const html = await scraper.getHtml(url);

    const parser = new Parser(html);
    const products = parser.getProducts();

    for (let product of products) {
        await createProduct(product.nombre,product.imagen,product.precio);
    }
    scraper.close();    
}



export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    scrapProducts,
}
