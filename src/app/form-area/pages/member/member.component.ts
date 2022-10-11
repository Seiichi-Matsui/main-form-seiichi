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
  // mcChange(users:any) {
  //   const mcChange = users.filter(users => dog.type === 'pomeranian');
    
  //   const mcChange = this.contacts.reduce((result:any, current:any) => {
  //     const element = result.find((p:any) => p.manager === current.manager);
  //     if (element) {
  //       element.managedCases ++
  //     } else {
  //       result.push({
  //         manager: current.manager,
  //         managedCases: 1,
  //       });
  //     }
  //     return result;
  //     }, []);
      
  //     mcChange.forEach(function (cValue:any) {

  //     const targetUser = users.find((v:any) => v.username === cValue.manager)
  //     targetUser.push

  //     })
  // }

  
  // changeManagedCases(targetUser:any) {
  //   this.updateUser = {
  //     _id: findUser._id,
  //     managedCases: targetUser["managedCases"],
  //   }

  //   this.authService.update(this.updateUser).subscribe(
  //     (date) => {
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.error(err)
  //   })
  // }

  // }
  
    
    
      
      
    
  
}
  
    

