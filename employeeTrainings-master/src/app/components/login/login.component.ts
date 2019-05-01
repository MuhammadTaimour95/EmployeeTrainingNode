import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    showPassword = false;
    error: { code: number, message: string };
    requestInProgress = false;
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    checkEmail(loginForm: NgForm) {
        console.log('loginForm', loginForm);
        this.error = {
            code: null, message: null
        }
        if (!loginForm.value.email) {
            this.error = {
                code: 1, message: 'Email cannot be empty'
            }
        }
        else this.showPassword = true;
        //validate loginForm.values.email from api exists in 
    }
    login(loginForm: NgForm) {
        //login through api
        this.requestInProgress = true;
        this.requestInProgress = false;
    }
    routeTo(r) {
        this.router.navigate([`${r}`]);
    }

}
