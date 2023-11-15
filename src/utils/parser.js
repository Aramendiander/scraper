import {JSDOM} from "jsdom";
class Parser{
    constructor(html){
        this.html = html;
        this.dom = new JSDOM(html);
    }

    getListSection(){
        const result = this.dom.window.document.querySelector(".product-lineal-content");
        return result;
    }

    getItems(section){
        const results = section.querySelectorAll(".product-item");
        const resultsArray = Array.from(results);
        return resultsArray;
    }
    getTitle(item){
        const result = item.querySelector(".product-title");
        return result.textContent.trim();
    }
    getPrice(item){
        const result = item.querySelector(".price-offer-now");
        const price = result.textContent.trim();
        const priceNumber = parseFloat(price.replace(",","."));
        return priceNumber;
    }
    getImage(item){
        const result = item.querySelector(".product-image img");
        return result.src;
    }
    getProducts(){
        const section = this.getListSection();
        const items = this.getItems(section);
        const products = items.map(item=>{
            const nombre = this.getTitle(item);
            const precio = this.getPrice(item);
            const imagen = this.getImage(item);
            return {nombre,precio,imagen};
        })
        return products;
    }
}

export default Parser;