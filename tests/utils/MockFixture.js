const base=require('@playwright/test')
const Baseurl='https://eventhub.rahulshettyacademy.com';
exports.customtests=base.test.extend(
    {
        ApiRoute:async({page},use)=>{
          await  page.goto(Baseurl);
          const userName=page.locator("#userEmail");
          const password=page.locator("#userPassword");
          await page.getByPlaceholder('email@example.com').fill("Arun_kumar@gmail.com");
          await page.getByPlaceholder('enter your passsword').fill("Arunkumar@1649");
          await page.getByRole("button",{name:'Login'}).click();
          await page.waitForLoadState('networkidle');
          use(page)  
        }
    }
)