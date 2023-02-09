import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

    public loading: boolean = true;
    public sendLoading: boolean = false;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    contactForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required]),
    });

    sendContact(): void {
        this.sendLoading = true;
        setTimeout(() => {
            this.contactForm.reset();
            this.sendLoading = false;         
        }, 500);
    }

    getNameControl(): AbstractControl<any, any> | null {
        return this.contactForm.get('name');
    }

    getEmailControl(): AbstractControl<any, any> | null {
        return this.contactForm.get('email');
    }

    getTitleControl(): AbstractControl<any, any> | null {
        return this.contactForm.get('title');
    }

    getBodyControl(): AbstractControl<any, any> | null {
        return this.contactForm.get('body');
    }
}