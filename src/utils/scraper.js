import puppeteer from 'puppeteer';
export default class Scraper{
    constructor(){
        this.isReady = false;
        this.browser = null;
        this.promise = this.init();
    }
    async init(){
        this.browser = await puppeteer.launch({
            headless: true,
            args:["--no-sandbox"]
        });
        this.isReady = true;
    }
    async getHtml(url){
        await this.promise;
        const page = await this.browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await page.close();
        return html;
    }
    async close(){
        await this.browser.close();
    }

}