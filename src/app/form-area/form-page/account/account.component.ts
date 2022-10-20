import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CntactService } from 'src/app/common/form-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  meta:any =  localStorage.getItem('app-meta')
  user:any = JSON.parse(this.meta)
  errors:any = ''
  account:any = {
    _id: this.user.userId,
    username: '',
    email: '',
    authority: '',
    password: '',
  }

  constructor(
    private router: Router,
    private contactService: CntactService
  ) { }

  ngOnInit(): void {
    
  }

    accountChange(i: any) {
      if(i.value.usernameChack) {
       this.account.username = i.value.username        
      }

      if(i.value.mailChack) {
        this.account.email = i.value.email
      }

      if(i.value.authorityChack) {
        this.account.authority = i.value.authority
      }

      if(i.value.passwordChack) {
        if(i.value.password === i.value.confirmPassword) {
          this.account.password = i.value.password
        } else {
          console.log("パスワードが一致しないみたい");
        }
      }

        this.contactService.account(this.account)
        
        this.router.navigate(['/auth'])
    }

}
