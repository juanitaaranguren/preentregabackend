const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.productos = [];
        this.loadProductos();
    }

    loadProductos() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.productos = JSON.parse(data);
        } catch (error) {
            this.productos = [];
        }
    }

    saveProductos() {
        fs.writeFileSync(this.path, JSON.stringify(this.productos, null, 2), 'utf-8');
    }

    getProductos() {
        return this.productos;
    }

    agregarProducto(title, descripcion, price, thumbail, code, stock) {
        const producto_id = this.productos.length + 1;

        const producto = {
            id: producto_id,
            title,
            descripcion,
            price,
            thumbail,
            code,
            stock
        };

        this.productos.push(producto);
        this.saveProductos();
        console.log("Producto agregado correctamente");
    }

    getProductobyId(producto_id) {
        const producto_encontrado = this.productos.find(producto => producto.id === producto_id);

        if (!producto_encontrado) {
            console.log("Producto no encontrado");
            return;
        }

        const producto_copiado = { ...producto_encontrado };
        producto_copiado.id = this.productos.length + 1;

        this.productos.push(producto_copiado);
        this.saveProductos();
        console.log("Producto copiado correctamente");
    }
}

const productManager = new ProductManager('productos.json');

productManager.agregarProducto("Arroz", "Grano", 2340, 9209344, 423, 100);
productManager.agregarProducto("Lentejas", "Grano", 44, 45456, 456, 50);
productManager.agregarProducto("Bananas", "Frutas", 47, 4534546, 546, 23);

const productos = productManager.getProductos();
console.log(productos);
