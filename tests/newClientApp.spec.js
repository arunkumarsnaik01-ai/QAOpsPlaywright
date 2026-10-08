const {test,expect}=require('@playwright/test')
test('stepofGetByLabeltextRolePlaceholder',async({browser})=>
{ 
   //const slowExpect=expect.configure({timeout:10000});
   const context= await browser.newContext();
   const page= await context.newPage()
   await page.goto('https://www.rahulshettyacademy.com/client/auth/login');
   const userName=page.locator("#userEmail");
   const password=page.locator("#userPassword");
   await page.getByPlaceholder('email@example.com').fill("Arun_kumar@gmail.com");
   await page.getByPlaceholder('enter your passsword').fill("Arunkumar@1649");
   await page.getByRole("button",{name:'Login'}).click();
   await page.waitForLoadState('networkidle');
   const ProductName='iphone 13 pro';
   const product=await page.locator('.card-body');
   const count=await product.count();
    await product.filter({hasText:ProductName}).getByRole("button",{name: 'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button",{name:"  Cart "}).click();
    await page.locator("div li").first().waitFor()
    await expect(page.getByText(ProductName)).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
    await page.getByRole("button",{name:"India"}).nth(1).click();
   const cardinput=page.locator('.form__cc input')
   await cardinput.nth(1).fill("123");
   await cardinput.nth(2).fill("Arunkumar");
   await cardinput.nth(3).fill("rahulshettyacademy");
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   let orderNumber=await page.locator('label.ng-star-inserted').textContent();
   console.log(orderNumber)
   const orderNumber1=orderNumber.split("|")[1].trim();
   console.log(orderNumber1);
  await page.locator("label[routerlink*='myorder']").click();
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

