const Data = require('../PageObjectModules/credential.json');

class LoginPage {

    constructor(page) {

        this.page = page;

        this.userNameField =
            this.page.getByPlaceholder('email@example.com');

        this.passwordField =
            this.page.getByPlaceholder('enter your passsword');

        this.signInButton =
            this.page.getByRole('button', { name: 'Login' });
    }

    async LaunchUrl() {

        await this.page.goto(Data.url);
    }

    async LogintothePage() {

        await this.userNameField.fill(Data.username);

        await this.passwordField.fill(Data.pwd);

        await this.signInButton.click();
    }
}

module.exports = { LoginPage };