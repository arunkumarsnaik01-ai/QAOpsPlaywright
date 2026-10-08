const {test}=require('@playwright/test');

const {Customtest}=require('./utils/Fixtures.js')

Customtest('FixtureLogin',async({AuthenticatedPage})=>{
    await AuthenticatedPage.goto('https://www.rahulshettyacademy.com/client/auth/login');

});