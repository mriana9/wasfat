import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { AuthService, UserService } from 'src/app/services';

@Component({
    selector: 'app-fake-favorite',
    templateUrl: './fake-favorite.component.html',
    styleUrls: ['./fake-favorite.component.scss']
})
export class FakeFavoriteComponent implements OnInit {

    public errorMessage: string = '';
    public loginButtonLoading: boolean = false;
    public registerButtonLoading: boolean = false;
    public addLoginPopup: boolean = false;
    public addRegisterPopup: boolean = false;

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    public registerForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        gender: new FormControl('', [Validators.required]),
        DOB: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });

    constructor(public userService: UserService, public auth: AuthService) { }

    ngOnInit(): void {
    }

    login(): void {
        this.loginForm.disable();
        this.errorMessage = '';
        this.loginButtonLoading = true;
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(() => {
            location.reload();
        }).catch(() => {
            this.errorMessage = 'Invalid email or password';
            this.loginButtonLoading = false;
            this.loginForm.enable();
        });
    }

    addUser(): void {
        this.registerForm.disable();
        this.registerButtonLoading = true;
        this.errorMessage = '';
        const newUser: IUser = {
            id: '',
            firstName: this.getFirstNameControl()?.value,
            lastName: this.getLastNameControl()?.value,
            dateOfBirth: this.getDOBControl()?.value,
            gender: this.getGenderControl()?.value,
            email: this.getEmailControl()?.value,
        }

        this.auth.register(newUser.email, this.getPasswordControl()?.value).then(() => {
            this.userService.saveUserInfo(newUser).then(() => {
                location.reload();
            });
        }).catch(() => {
            this.errorMessage = 'Email is already registered';
            this.registerButtonLoading = false;
            this.registerForm.enable();
        });
    }

    resetForms(): void {
        this.loginForm.reset();
        this.registerForm.reset();
        this.errorMessage = '';
    }

    getFirstNameControl(): AbstractControl<any> | null {
        return this.registerForm.get('firstName');
    }

    getLastNameControl(): AbstractControl<any> | null {
        return this.registerForm.get('lastName');
    }

    getDOBControl(): AbstractControl<any> | null {
        return this.registerForm.get('DOB');
    }

    getEmailControl(): AbstractControl<any> | null {
        return this.registerForm.get('email');
    }

    getPasswordControl(): AbstractControl<any> | null {
        return this.registerForm.get('password');
    }

    getGenderControl(): AbstractControl<any> | null {
        return this.registerForm.get('gender');
    }

    closeLoginBox(): void {
        this.addLoginPopup = !this.addLoginPopup;
    }

    showLoginPopup(): void {
        this.resetForms();
        this.addLoginPopup = true;
        this.addRegisterPopup = false;
    }

    showRegisterPopup(): void {
        this.resetForms();
        this.addLoginPopup = false;
        this.addRegisterPopup = true;
    }

    closeRegisterBox(): void {
        this.addRegisterPopup = !this.addRegisterPopup;
    }
}
