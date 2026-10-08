const {test,expect}=require('@playwright/test')
test('LoginPage',async({browser})=>
{
   const context= await browser.newContext();
   const page= await context.newPage()
   await page.goto('https://www.rahulshettyacademy.com/client/auth/login');
   const userName=page.locator("#userEmail");
   const password=page.locator("#userPassword");
   await userName.fill("Arun_kumar@gmail.com");
   await password.fill("Arunkumar@1649");
   await page.locator("[type='submit']").click();
   await page.waitForLoadState('networkidle');
   const ProductName='iphone 13 pro';
   const product=await page.locator('.card-body');
   const ProductTitle=await page.locator('.card-body').allTextContents();
   console.log(ProductTitle);
   const count=await product.count();
   for(let i=0;i<count;i++){
      
      if(await product.nth(i).locator('b').textContent()==ProductName){
         await product.nth(i).locator("text= Add To Cart").click();
         break;    
         }
      }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor()
    const bool=await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();
    const validateProductName= await page.locator('.infoWrap h3').textContent();
    if(ProductName==validateProductName){
    console.log(validateProductName);
    await page.locator("[type='button']").locator("text=Checkout").click();
    }
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
    const dropdown=page.locator(".ta-results button")
    await expect(dropdown.first()).toBeVisible();
    const optioncount=await dropdown.count();
    console.log(optioncount)
    for(let i=0;i<optioncount;i++){
       const name= await dropdown.nth(i).textContent();
       if(name?.trim()==="India"){
         await dropdown.nth(i).click();
         break;
       }
    }
    const cardinput=page.locator('.form__cc input')
   await cardinput.nth(1).fill("123");
   await cardinput.nth(2).fill("Arunkumar");
   await cardinput.nth(3).fill("rahulshettyacademy");
   await page.locator('[type="submit"]').click();
   await page.locator("text=Place Order ").click();
   await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
   let orderNumber=await page.locator('label.ng-star-inserted').textContent();
   console.log(orderNumber)
   const orderNumber1=orderNumber.split("|")[1].trim();
   console.log(orderNumber1);
   await page.locator("label[routerlink*='myorders']").click();
   expect(page.locator("h1[class='ng-star-inserted']")).toHaveText("Your Orders");
   const tablept=page.locator("[scope='row']");
   const view=page.locator('[class="btn btn-primary"]');
   await expect(tablept.first()).toBeVisible();
   const tablecount=await tablept.count();
   console.log(tablecount)
   for(let i=0;i<tablecount;i++){
      const rowid=await tablept.nth(i).textContent();
      console.log(rowid,orderNumber1,i);
      if(orderNumber1===rowid){
         await view.nth(i).click();
         await expect(page.locator('.email-container .email-title')).toHaveText(' order summary ');
         break;
      }
   }

});

