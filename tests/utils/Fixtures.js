const base=require('@playwright/test');

 exports.Customtest=base.test.extend({
  AuthenticatedPage: async({page},use)=>{
   await page.goto('https://www.rahulshettyacademy.com/client/auth/login');
   const userName=page.locator("#userEmail");
   const password=page.locator("#userPassword");
   await page.getByPlaceholder('email@example.com').fill("Arun_kumar@gmail.com");
   await page.getByPlaceholder('enter your passsword').fill("Arunkumar@1649");
   await page.getByRole("button",{name:'Login'}).click();
   await page.waitForLoadState('networkidle');
   use(page)  

    }
})