import Product from "../../src/models/productModel.js";
import mongoose from "mongoose";

describe("Tests de modelo de producto",() => {
    let id = null;
    const nombre="Aifon";
    const imagen="Coges el movris y lo tiras";
    const precio = 5000;

    afterAll(async()=>{
        await mongoose.disconnect();
    })
    test("Crear un producto nuevo",async () => {
        const producto = await Product.create({nombre,imagen,precio});
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.nombre).toEqual(nombre);
        expect(producto.imagen).toEqual(imagen);
        expect(producto.precio).toEqual(precio);
        id = producto._id;
    });

    test("Conseguir todos los productos",async()=>{
        const productos = await Product.find();
        expect(productos.length).toBeGreaterThan(0);
        expect(productos[0]).toHaveProperty("nombre");
        expect(productos[0]).toHaveProperty("imagen");
        expect(productos[0]).toHaveProperty("precio");
    })

    test("Conseguir un producto por id", async()=>{
        const producto = await Product.findOne({_id:id});
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.nombre).toEqual(nombre);
        expect(producto.imagen).toEqual(imagen);
        expect(producto.precio).toEqual(precio);
    })

    test("Editar un producto por id",async()=>{
        const producto = await Product.findOne({_id:id});
        producto.nombre="Anderoid";
        producto.precio=9999;
        await producto.save();
        const productoNuevo =  await Product.findOne({_id:id});
        expect(productoNuevo).not.toBeUndefined();
        expect(productoNuevo).not.toBeNull();
        expect(productoNuevo.nombre).toEqual("Anderoid");
        expect(productoNuevo.imagen).toEqual(imagen);
        expect(productoNuevo.precio).toEqual(9999);
    })

    test("Borrar un producto por id",async()=>{
        await Product.deleteOne({_id:id});
        const oldProduct = await Product.findOne({_id:id});
        expect(oldProduct).toBeNull();

    })


})