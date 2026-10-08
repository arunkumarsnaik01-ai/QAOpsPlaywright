const { test, expect } = require('@playwright/test');
const {MainObject}=require('../PageObjectModules/Supercl');
const ProductName='iphone 13 pro';

test('StepsLoginAndVerify', async ({ page }) => {

    const Supercl = new MainObject(page);

    await Supercl.LognPageCheck();

    await page.waitForLoadState('networkidle');

    await loginPage.LogintothePage();
});

test('CheckoutPage',async({page})=>{

});