import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
    requestInProgress = false;
    error: { code: number, message: string };
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }
    signup(loginForm: NgForm) {
        //login through api
        this.requestInProgress = true;
        this.requestInProgress = false;
    }
    routeTo(r) {
        this.router.navigate([`${r}`]);
    }
}
