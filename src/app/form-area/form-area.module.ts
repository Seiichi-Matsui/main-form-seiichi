import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SituationComponent } from './situation/situation.component';
import { FormPageComponent } from './form-page/form-page.component';
import { FormAreaComponent } from './form-area.component';
import { FormMailComponent } from './form-page/form-mail/form-mail.component';
import { FormMainComponent } from './form-page/form-main/form-main.component';
import { FormNavComponent } from './form-page/form-nav/form-nav.component';
import { FormSettingComponent } from './form-page/form-setting/form-setting.component';
import { FormComponent } from './situation/form/form.component';
import { SituationListComponent } from './situation/situation-list/situation-list.component';
import { FormListComponent } from './situation/form/form-list/form-list.component';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { MemberComponent } from './pages/member/member.component';


const routes: Routes = [
  { path: 'form', component: FormAreaComponent,
    children: [
      { path: 'situation', component: SituationComponent },
      { path: ':contactId', component: FormPageComponent},
    ]
  },
  { path: 'member', component: MemberComponent }
]

@NgModule({
  declarations: [
    FormAreaComponent,
    FormPageComponent,
    SituationComponent,
    FormMainComponent,
    FormMailComponent,
    FormNavComponent,
    FormSettingComponent,
    FormComponent,
    SituationListComponent,
    FormListComponent,
    PagesComponent,
    MemberComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
  ],
})
export class FormAreaModule { }