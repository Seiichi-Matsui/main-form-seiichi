import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/shared/auth.service';
import { CntactService } from "../../../../common/form-service";
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {  statuses:any =["対応中","保留中","解決済み"]
priorities:any = ["低","中","高","緊急"]
desiredContacts:any = ["電話","メール"]
users:any
contacts: any
findContacts:any
setting:any = {
  status: '状況',
  priority: '優先度',
  desiredContact: '連絡方法',
  manager: '担当者'
}
  constructor(
    private cotactService: CntactService,
    private authService: AuthService
    ) { 
      const usersObservable = this.authService.getUsers()
      usersObservable.subscribe(
        (date) => {
          this.users = date
      },
        (err) => { console.log('次のエラーが発生しました!:' + err) }
      )
      this.date()
    }

  ngOnInit(): void {
  }

  date() {
    
    const contactsObservable = this.cotactService.getContacts()
    contactsObservable.subscribe(
      (date) => {
      this.contacts = date
      
    },
      (err) => { console.log('次のエラーが発生しました!:' + err) }
    )
  }

  statusFilter(value:any) {
    this.date()
    this.setting.status = value
    setTimeout(() => {
      this.update()
    }, 500);
  }

  priorityFilter(value:any) {
    this.date()
    this.setting.priority = value
    
    setTimeout(() => {
      this.update()
    }, 500);
  }

  desiredContactFilter(value:any) {
    this.date()
    this.setting.desiredContact = value
    setTimeout(() => {
      this.update()
    }, 500);
  }

  managerChangeFilter(value:any) {
    this.date()
    this.setting.manager = value
    setTimeout(() => {
      this.update()
    }, 500);
  }

  update() {

    this.findContacts = this.contacts
    if(this.setting.status !== "状況") {
      this.findContacts = this.findContacts.filter((contact:any) =>
      this.setting.status === contact.status
      )
    }
    
    if(this.setting.priority  !== "優先度") {
      this.findContacts = this.findContacts.filter((contact:any) =>
      this.setting.priority === contact.priority
      )
    }
    if(this.setting.desiredContact !== "連絡方法") {
      this.findContacts = this.findContacts.filter((contact:any) =>
      this.setting.desiredContact === contact.desiredContact
      )
    }
    if(this.setting.manager !== "担当者") {
      this.findContacts = this.findContacts.filter((contact:any) =>
      this.setting.manager === contact.manager
      )
    }
    
    
    if(!this.findContacts.length) {
      if (this.setting.status === "状況"){
        this.findContacts = this.contacts.filter((contact:any) => 
        this.setting.status !== contact.status

      )}
      if (this.setting.priority === "優先度"){
        this.findContacts = this.contacts.filter((contact:any) => 
        this.setting.priority !== contact.priority

      )}
      if (this.setting.desiredContact === "連絡方法"){
        this.findContacts = this.contacts.filter((contact:any) => 
        this.setting.desiredContact !== contact.desiredContact

      )}
      if (this.setting.manager === "担当者"){
        this.findContacts = this.contacts.filter((contact:any) => 
        this.setting.manager !== contact.manager
      )}
      
    this.date()

    }else {
    this.contacts = this.findContacts
    }
  }


  status(e: any) {
    if(e.target.value !== "状況"){
    const status = e.target.value
    this.statusFilter(status)
    } else {
    const value = "状況"
      this.statusFilter(value)
      
    }
  }

  priority(e: any) {
    if(e.target.value !== "優先度"){
    const status = e.target.value
    this.priorityFilter(status)
    } else {
      const value = "優先度"
        this.priorityFilter(value)
    }
  }

  desiredContact(e: any) {
    if(e.target.value !== "連絡方法"){
    const status = e.target.value
    this.desiredContactFilter(status)
    } else {
      const value = "連絡方法"
        this.desiredContactFilter(value)
    }
    }

  managerChange(e: any) {
    if(e.target.value !== "担当者"){
    const status = e.target.value
    this.managerChangeFilter(status)
    } else {
      const value = "担当者"
        this.managerChangeFilter(value)
    }
    }
}

