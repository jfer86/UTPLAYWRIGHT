import { Page } from '@playwright/test';
import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { InputText } from '../components/InputText';

export class LoginPage {
    readonly userName: InputText;
    readonly password: InputPassword;
    readonly login: Button;
    public BASE_URL = process.env.BASE_URL!;

    constructor(private page: Page) {
        this.userName = new InputText(page, 'input[name="username"]', false);
        this.password = new InputPassword(page, 'input[name="password"]', false);
        this.login = new Button(page, 'Login');
    }

    public async goTo() {
        await this.page.goto(this.BASE_URL);
    }

    public async loginWithUser(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.login.click();
    }
}