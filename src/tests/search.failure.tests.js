import { ResultListPage } from "../po/pages/resultList.page.js"
import { HomePage } from "../po/pages/home.page.js"
const resultLanding = new ResultListPage()
const homePage = new HomePage()


describe('Negative test search', () => {
    before(async () => {
        await homePage.open()
    })
    it('Perform the search', async () => {
        await homePage.header.item('search').click()
        await $('//input[@class="qdOxv-fmcmS-wGMbrd"]').setValue('kjhgfd')
        await $('//i[@class="google-material-icons PETVs PETVs-OWXEXe-UbuQg"]').click()
       await expect(await resultLanding.rusultListCalculator.openCalculator.isDisplayed())
    })
    
})
