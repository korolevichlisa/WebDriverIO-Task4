import { CalculatorLanding } from "../po/pages/calculatorLanding.page.js"
import { ResultListPage } from "../po/pages/resultList.page.js"
import { CostEstimateSummary } from "../po/pages/cost-estimate-summary.page.js"
import { HomePage } from "../po/pages/home.page.js"
import { defaultData,commitedBtn } from "../test-data/default-data.testdata.js"
const costEstimateSummary = new CostEstimateSummary()
const calculatorLandingPage = new CalculatorLanding()
const resultLanding = new ResultListPage()
const homePage = new HomePage()

describe('Task 4', () => {
    before(async () => {
        await homePage.open()
    })
    it('Google Cloud Platform Pricing Calculator with failure @e2e',async() => {
        await homePage.header.item('search').click()
        await $('//input[@class="qdOxv-fmcmS-wGMbrd"]').setValue('Google Cloud Platform Pricing Calculator')
        await $('//i[@class="google-material-icons PETVs PETVs-OWXEXe-UbuQg"]').click()
        await resultLanding.rusultListCalculator.openCalculator.click()
        await calculatorLandingPage.addEstimate.addToEstimate.click()
        await calculatorLandingPage.popUpEstimate.rootEl.waitForDisplayed()
        await calculatorLandingPage.popUpEstimate.item('computeEngine').click()
        await expect( await calculatorLandingPage.popUpEstimate.rootEl).not.toBeDisplayed()
        
        await $('//div[contains(@class,"QiFlid")]/descendant::input[@type="number"]').setValue(defaultData.numberOfInstance)
        await $('//div[text()="Machine type"]/ancestor::div[contains(@class,"XIfRlb")]').scrollIntoView()
        await $('//span[text()= "Machine type"]/ancestor::div[contains(@class,"PPUDSe")]').click()
        await calculatorLandingPage.computeEngine.settings(defaultData.machineType[0]).click()
        await calculatorLandingPage.computeEngine.addGPU.scrollIntoView({block:'center'});
        await calculatorLandingPage.computeEngine.addGPU.click()
        await $('//span[text()="GPU Model"]/ancestor::div[contains(@class,"Iykrdb")]').click()
        await calculatorLandingPage.computeEngine.settings(defaultData.gpuModel).click()
        await $('//span[text()="Local SSD"]/ancestor::div[contains(@class,"Iykrdb")]').click()
        await $(`//span[contains(text(),"${defaultData.ssd}")]/ancestor::li[contains(@class,"MCs1Pd")]`).click()
        await calculatorLandingPage.computeEngine.region.scrollIntoView({block:'center'})
        await calculatorLandingPage.computeEngine.region.click()
        await calculatorLandingPage.computeEngine.settings(defaultData.region[1]).click()
        await calculatorLandingPage.computeEngine.buttonCommited(commitedBtn.one).click()
        await browser.pause(2000)

        const estimateCost = await calculatorLandingPage.costDetails.rootEl.$('//label[contains(@class,"gt0C8e")]').getText()
        await calculatorLandingPage.costDetails.rootEl.$('//span[contains(text(),"Share")]/ancestor::button[contains(@class,"FOBRw-LgbsSe")]').click()
        
        await calculatorLandingPage.popUpShareEstimate.rootEl.waitForDisplayed()
        await calculatorLandingPage.popUpShareEstimate.rootEl.$('//a[contains(text(),"Open estimate summary")]').click()
        const aHref = await calculatorLandingPage.popUpShareEstimate.rootEl.$('//a[contains(text(),"Open estimate summary")]').getAttribute('href')
        await browser.switchWindow(aHref)

        const totalEstimateCost = await costEstimateSummary.totalEstimateCost.totalPrice.getText()
        
        await expect(estimateCost).toEqual(totalEstimateCost)
        await expect(await costEstimateSummary.totalEstimateCost.item('numberInstance').getText()).toEqual(defaultData.numberOfInstance)
        await expect(await costEstimateSummary.totalEstimateCost.item('OS').getText()).toEqual(defaultData.OS)
        await expect(await costEstimateSummary.totalEstimateCost.item('provisioningModel').getText()).toEqual(defaultData.provisioningModel)
        await expect(await costEstimateSummary.totalEstimateCost.item('machineType').getText()).toEqual(defaultData.machineType.join(''))
        await expect(await costEstimateSummary.totalEstimateCost.item('gpuModel').getText()).toEqual(defaultData.gpuModel)
        await expect(await costEstimateSummary.totalEstimateCost.item('numbersGPU').getText()).toEqual(defaultData.numbersGPU)
        await expect(await costEstimateSummary.totalEstimateCost.item('ssd').getText()).toEqual(defaultData.ssd)
        await expect(await costEstimateSummary.totalEstimateCost.item('region').getText()).toEqual(defaultData.region[1])
        await expect(await costEstimateSummary.totalEstimateCost.item('commited').getText()).toEqual(commitedBtn.one)
    })
})
