class checkout{
    constructor(page){
        this.page=page;
        this.product=this.page.locator('.card-body')
        this.cart=this.page.getByRole("listitem").getByRole("button",{name:"  Cart "})
        this.firstItem=this.page.locator("div li").first()
    }
    async checkoutPage(ProductName){
           
            await this.cart.click();
            await this.this.firstItem.waitFor()
            await expect(this.page.getByText(ProductName)).toBeVisible();
            await thispage.getByRole("button",{name:"Checkout"}).click();
            await this.page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
            await this.page.getByRole("button",{name:"India"}).nth(1).click();
           const cardinput=page.locator('.form__cc input')
           await cardinput.nth(1).fill("123");
           await cardinput.nth(2).fill("Arunkumar");
           await cardinput.nth(3).fill("rahulshettyacademy");
           await page.getByText("PLACE ORDER").click();
           await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    }
}
module.exports={checkout};