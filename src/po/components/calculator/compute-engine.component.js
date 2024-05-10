export class ComputeEngine{
   
    get addGPU() {
        return $('//div[text()="Add GPUs"]/ancestor::div[contains(@class,"XIfRlb")]/preceding-sibling::div')
    } 

    get region() {
        return $('//span[text()="Region"]/ancestor::div[contains(@class, "VfPpkd-O1htCb")]')
    }
    settings(param) {
        return $(`//span[contains(text(),"${param}")]/ancestor::li[contains(@class,"MCs1Pd")]`)
    }

    buttonCommited(param) {
        return $(`//label[contains(text(),"${param}")]/ancestor::div[contains(@class,"e2WL2b")]`)
    }
    
}