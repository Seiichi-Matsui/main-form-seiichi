import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
    errors: any = []
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {}

    login(loginForm: any) {
        
        this.authService.login(loginForm.value).subscribe(
            (token) => {
                this.router.navigate(['/form/situation'])
            },
            (err: HttpErrorResponse) => {
                console.error(err);
                this.errors = err.error.errors
            }
        )
    }
}