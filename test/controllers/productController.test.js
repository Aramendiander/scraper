import productController from "../../src/controllers/productController.js";
import db from "../../src/config/db.js";


describe("Test de productController", function () {

    let productId = 0;
    beforeAll(async () => {
        await db;
    });
    test("Create product", async () => {
        const nombre = "TestCreate";
        const imagen = "TestCreate";
        const precio = 100;
        const product = await productController.createProduct(nombre, imagen, precio);
        console.log(product);
        productId = product._id;
        expect(product).not.toBeNull();
        expect(product._id).not.toBeNull();
        expect(product.nombre).toEqual(nombre);
        expect(product.imagen).toEqual(imagen);
        expect(product.precio).toEqual(precio);
    });

    test("Get all products", async function () {
        const products = await productController.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products.find(p => p._id === productId)).not.toBeNull();
    });

    test("Get product by id", async function () {
        const id = productId;
        const product = await productController.getProductById(id);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.nombre).toEqual("TestCreate");
        expect(product.imagen).toEqual("TestCreate");
        expect(product.precio).toEqual(100);
    });


    test("Update product", async function () {
        const id = productId;
        const nombre = "TestUpdate";
        const imagen = "TestUpdate";
        const precio = 200;
        const product = await productController.updateProduct(id, nombre, imagen, precio);
        const newProduct = await productController.getProductById(id);
        expect(newProduct).not.toBeNull();
        expect(newProduct._id).toEqual(id);
        expect(newProduct.nombre).toEqual(nombre);
        expect(newProduct.imagen).toEqual(imagen);
        expect(newProduct.precio).toEqual(precio);
    });

    test("Delete product", async function () {
        const id = productId;
        await productController.deleteProduct(id);
        const product = await productController.getProductById(id);
        expect(product).toBeNull();
    });

});