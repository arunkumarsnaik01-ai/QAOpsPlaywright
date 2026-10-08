const {test,expect}=require('@playwright/test')

test('Firstplaywrighttest',async({browser})=>
{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto('https://www.google.com');

});

test('SecondPlaywrighttest',async({browser})=>
{
 const context= await browser.newContext();
 const page=await context.newPage();
 
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 //const Title=await expect(page).toHaveTitle('Rahul Shetty Academy');
 //await console.log(Title)
 const username=page.locator('input#username');
 const SignIn=page.locator('#signInBtn');
 await username.fill("Arunkumar");
 await page.locator("[type='password']").fill("Arunkumar");
 await SignIn.click()
 console.log(await page.locator("[style*='block']").textContent());
 await expect(page.locator("[style*='block']")).toContainText('Incorrect');
 await username.fill("rahulshettyacademy");
 await page.locator("[type='password']").fill("Learning@830$3mK2");
 await SignIn.click()
 const nodeName=page.locator(".card-body a")
 //console.log(await nodeName.nth(0).textContent());
 console.log(await nodeName.allTextContents())


});

test('PracticeWebsite',async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const userName=page.locator('#userEmail');
    const password=page.locator("[id='userPassword']");
    const SignIn=page.locator('#login')
    await userName.fill("Arunkumar1@gmail.com");
    await password.fill("Arunkumar@22");
    await SignIn.click();
    await page.locator('.card-body b').first().waitFor();
    const title= await page.locator('.card-body b').allTextContents();
    console.log(title)
});

test('SelectRadioButton',async({page})=>
{

 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const username=page.locator('input#username');
 const SignIn=page.locator('#signInBtn');
 await username.fill("rahulshettyacademy");
 await page.locator("[type='password']").fill("Learning@830$3mK2");
 await page.locator("select.form-control").selectOption("teach");
 await page.locator("label.customradio input").last().click();
 await page.locator("#okayBtn").click();
 await page.pause()
 await SignIn.click()
});


test.only('ChildWindowHandling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.locator('[for="username"]').textContent());

});