const {LoginPage}=require('../PageObjectModules/LoginPage')
const {CheckOutPage}=require('../PageObjectModules/CheckOutPage')

class MainObject{
   constructor(){
    this.newLogin= new LoginPage({page})
    this.chekitem= new CheckOutPage({page})
   }

 async LognPageCheck(){
    return this.newLogin;
 }
 async CheckoutPagecheck(){
    return this.chekitem;
 }
}
module.exports={MainObject}