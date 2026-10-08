const {test,expect}=require('@playwright/test')
test('ChildWindowHandling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.locator('[for="username"]').textContent());
    const documentLink=page.locator('[href*="documents-request"]');
    await expect(page.locator('[href*="documents-request"]')).toHaveAttribute("class","blinkingText");
   
});

test('CheckingAssestion',async({browser})=>{
  const context=await browser.newContext();
  const page= await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentlink1=page.locator('[href*="documents-request"]');
  await expect(documentlink1).toHaveAttribute("class","blinkingText");
});
test.only('Handling the Child window',async({browser})=>
    {
     const context= await browser.newContext();
     const page= await context.newPage();
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const documentlink1=page.locator('[href*="documents-request"]');
     await expect(documentlink1).toHaveAttribute("class","blinkingText");
     const [page2]=await Promise.all([
        context.waitForEvent('page'),
        documentlink1.click(),
     ])
     const domain= await page2.locator("[class='im-para red']").textContent();
     console.log(domain);
     const user= domain.split('@');
     const userid= user[1].split(" ")[0];
     console.log(userid);
     
     await page.locator('#username').fill(userid)
     await page.pause();
        
});