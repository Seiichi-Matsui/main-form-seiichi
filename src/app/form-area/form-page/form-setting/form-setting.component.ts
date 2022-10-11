import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CntactService } from 'src/app/common/form-service';
import { FormPageComponent } from '../form-page.component';

@Component({
  selector: 'app-form-setting',
  templateUrl: './form-setting.component.html',
  styleUrls: ['./form-setting.component.css']
})

@Injectable()
export class FormSettingComponent implements OnInit {
  meta:any =  localStorage.getItem('app-meta')
  user:any = JSON.parse(this.meta)
  authority:boolean = true
  users:any
  statuses:any =["対応中","保留中","解決済み"]
  priorities:any = ["低","中","高","緊急"]
  formSetting:any
  contact:any
  contacts:any
  

  constructor (
    private formPageComponent: FormPageComponent,
    private authService: AuthService,
    private contactService: CntactService
    ) {}


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
    },
      (err) => { console.log('次のエラーが発生しました!:' + err) }
    )

    const usersObservable = this.authService.getUsers()
    usersObservable.subscribe(
      (date) => {
        this.users = date
    },
      (err) => { console.log('次のエラーが発生しました!:' + err) }
    )
    this.contact = this.formPageComponent.contact
  }


  managerChange(e: any) {
    if(e.target.value !== "変更する"){
      this.formSetting = {
        _id: this.contact._id,
        manager: e.target.value,
        status: this.contact.status,
        priority: this.contact.priority
      }
      return this.setting(this.formSetting)
      }
    }

  statusChange(e: any) {
    if(e.target.value !== "変更する"){
      this.formSetting = {
        _id: this.contact._id,
        manager: this.contact.manager,
        status: e.target.value,
        priority: this.contact.priority
      }
      return this.setting(this.formSetting)
    }
  }

  priorityChange(e: any) {
    if(e.target.value !== "変更する"){
      this.formSetting = {
        _id: this.contact._id,
        manager: this.contact.manager,
        status: this.contact.status,
        priority: e.target.value
      }
      return this.setting(this.formSetting)
    }
  }


  setting(formSetting: any) {
    this.contactService.changeSetting(formSetting).subscribe(
  (date) => {
    this.contact = date
  },
  (err: HttpErrorResponse) => {
    console.error(err)
  }
  
)
}

}
