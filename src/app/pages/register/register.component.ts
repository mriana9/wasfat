import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService, UserService } from 'src/app/services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public errorMessage: string = '';
    public loading: boolean = true;
    public registerButtonLoading: boolean = false;

    public registerForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        gender: new FormControl('', [Validators.required]),
        DOB: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });

    constructor(public userService: UserService, public auth: AuthService, public router: Router) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = false;
        }, 500);
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
                this.router.navigateByUrl('home');
            });
        }).catch(() => {
            this.errorMessage = 'Email is already registered';
            this.registerButtonLoading = false;
            this.registerForm.enable();
        });
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
}
