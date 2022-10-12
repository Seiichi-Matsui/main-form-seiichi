import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CntactService } from 'src/app/common/form-service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  meta:any =  localStorage.getItem('app-meta')
  users:any
  user:any = JSON.parse(this.meta)
  authority:boolean = true
  contacts:any
  changeUser:any
  updateUser:any
  targetUser:any

  constructor(
    private authService: AuthService,
    private contactService: CntactService
  ) { }

  ngOnInit(): void {

    if(this.user.authority === "管理者"){
      this.authority = true
    } else {
      this.authority = false
    }

    const contactsObservable = this.contactService.getContacts()
    contactsObservable.subscribe(
      (date) => {
      this.contacts = date

      const usersObservable = this.authService.getUsers()
      usersObservable.subscribe(
        (date) => {
          this.users = date
          
      },
        (err) => { console.log('次のエラーが発生しました!:' + err) }
      )
    },
      (err) => { console.log('次のエラーが発生しました!:' + err) }
    )

    

  }

  clear(e: any){
    return this.authService.clear(e).subscribe(
        (date) => {
          const usersObservable = this.authService.getUsers()
          usersObservable.subscribe(
            (date) => {
              this.users = date
              
          },
            (err) => { console.log('次のエラーが発生しました!:' + err) }
          )
          
        },
        (err: HttpErrorResponse) => {
            console.log(err);
            
        }
    )
  }
  
    
    
      
      
    
  
}
  
    

