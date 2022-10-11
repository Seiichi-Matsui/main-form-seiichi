import { Component, OnInit } from '@angular/core';
import { FormPageComponent } from "../form-page.component";

@Component({
  selector: 'app-form-main',
  templateUrl: './form-main.component.html',
  styleUrls: ['./form-main.component.css']
})
export class FormMainComponent implements OnInit {

  constructor (private formPageComponent: FormPageComponent) {}

  contact = this.formPageComponent.contact
  name = this.contact.lastName + this.contact.firstName
  Pseudonym = this.contact.lastNamePseudonym + this.contact.firstNamePseudonym
  email = this.contact.emailFirst + this.contact.emailLast
  contacts = [
    {title: "受付日時", value: this.contact.date},
    {title: "お名前", value: this.name},
    {title: "ふりがな", value: this.Pseudonym},
    {title: "住所", value: this.contact.address},
    {title: "建物名", value: this.contact.buildingName},
    {title: "電話番号", value: this.contact.phoneNumber},
    {title: "電話区分", value: this.contact.phoneType},
    {title: "メールアドレス", value: this.email},
    {title: "希望連絡方法", value: this.contact.desiredContact},
    {title: "問い合わせ内容", value: this.contact.contactForm}
  ]

  ngOnInit(): void {
    
  }

}
