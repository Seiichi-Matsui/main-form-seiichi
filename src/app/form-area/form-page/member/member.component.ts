import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../auth/shared/auth.service'
import { CntactService } from '../../../common/form-service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
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
  counter:any

  constructor(
    private authService: AuthService,
    private contactService: CntactService
  ) { 
    if(this.user.authority === "管理者"){
      this.authority = true
    } else {
      this.authority = false
    }
    this.date()
    setTimeout(() => {
    this.count()
    }, 500)
  }

  ngOnInit(): void {

  }

  date() {
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
    )}

  count() {
    this.counter = this.contacts.reduce(function (result:any, current:any) {
      const element = result.find(function (p:any) {
        return p.manager === current.manager
      });
      if (element) {
        element.count ++
      } else {
        result.push({
          manager: current.manager,
          count: 1,
        });
      }
      return result;
    }, []);
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
  
    

