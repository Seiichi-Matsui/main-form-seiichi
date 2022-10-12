import { Component, OnInit } from '@angular/core';
import { FormListComponent } from "../form-list/form-list.component";

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent implements OnInit {

  statuses:any =["対応中","保留中","解決済み"]
  priorities:any = ["低","中","高","緊急"]
  desiredContacts:any = ["電話","メール"]
  users:any
  constructor(
    private formlistComponent: FormListComponent
    ) { }

  ngOnInit(): void {
  }

  status(e: any) {
    if(e.target.value !== "状況"){
    const status = e.target.value
    this.formlistComponent.statusFilter(status)
    }
    }

  priority(e: any) {
  }

  desiredContact(e: any) {
    }

  managerChange(e: any) {
    }

}
