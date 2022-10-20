import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CntactService } from 'src/app/common/form-service';

@Component({
  selector: 'app-account-auth',
  templateUrl: './account-auth.component.html',
  styleUrls: ['./account-auth.component.scss']
})
export class AccountAuthComponent implements OnInit {
  date:any = ''
  errors:any = ''
  user:any = {
    _id: '',
    password: ''
  }


  constructor(
    private contactService: CntactService,
    private router: Router,
    private authService: AuthService
  ) { 
    this.date = this.contactService.date
    
    
  }

  ngOnInit(): void {
  }

  accountChange(i:any) {
    this.user._id = this.date._id
    this.user.password = i.value.password
    
    this.authService.checkPassword(this.user).subscribe(
      () => {
        
      if(!this.date.password) {
        this.date.password = i.value.password
      }
      this.contactService.accountChange(this.date).subscribe(
      () => {
          this.router.navigate(['/form/situation'])
      },
      (err: HttpErrorResponse) => {
        debugger
          console.error(err);
          this.errors = err.error.errors
            
      }
      )
        
      },
      (err: HttpErrorResponse) => {
        
          console.error(err);
          this.errors = err.error.errors
          
    })


}
}
