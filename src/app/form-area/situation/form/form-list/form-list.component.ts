import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
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
baseContacts:any

  constructor(
    private cntactService: CntactService,
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
    
    const contactsObservable = this.cntactService.getContacts()
    contactsObservable.subscribe(
      (date) => {
      this.contacts = date
      this.baseContacts = date
      
    },
      (err) => { console.log('次のエラーが発生しました!:' + err) }
    )
  }

  statusFilter(value:any) {
    // this.date()
    setTimeout(() => {
      this.update(value)
    }, 500);
    // new Promise((resolve, reject)=>{
    //   resolve();
    // }).then(()=> 
    // )
    
      
  }

  update(value:any) {
    
    this.findContacts = this.contacts.filter((contact:any) =>
    value === contact.status || 
    value  === contact.priority ||
    value === contact.desiredContact ||
    value === contact.manager
    )

    if(!this.findContacts.length && value === "状況" || value === "優先度" || value === "連絡方法" || value === "担当者"){
        this.findContacts = this.contacts.filter((contact:any) => 
        value !== contact.status || 
        value !== contact.priority ||
        value !== contact.desiredContact ||
        value !== contact.manager
        )
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
    this.statusFilter(status)
    } else {
      const value = "優先度"
        this.statusFilter(value)
    }
  }

  desiredContact(e: any) {
    if(e.target.value !== "連絡方法"){
    const status = e.target.value
    this.statusFilter(status)
    } else {
      const value = "連絡方法"
        this.statusFilter(value)
    }
    }

  managerChange(e: any) {
    if(e.target.value !== "担当者"){
    const status = e.target.value
    this.statusFilter(status)
    } else {
      const value = "担当者"
        this.statusFilter(value)
    }
    }
}

