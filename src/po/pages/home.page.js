import { BasePage } from "./base.page.js"

export class HomePage extends BasePage{
    constructor(){
    super()
    }
    open() {
        return browser.url('https://cloud.google.com/')
    }
}