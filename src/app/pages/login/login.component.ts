import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public errorMessage: string = '';
    public loginButtonLoading: boolean = false;
    public loading: boolean = true;

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(public auth: AuthService, public router: Router) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    logingin(): void {
        this.loginForm.disable();
        this.errorMessage = '';
        this.loginButtonLoading = true;
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(() => {
            this.router.navigateByUrl('home');
        }).catch(() => {
            this.errorMessage = 'Invalid email or password';
            this.loginButtonLoading = false;
            this.loginForm.enable();
        });
    }

    getEmailControl(): AbstractControl<any> | null {
        return this.loginForm.get('email');
    }

    getPasswordControl(): AbstractControl<any> | null {
        return this.loginForm.get('password');
    }
}
