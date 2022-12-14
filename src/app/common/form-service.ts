import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CntactService {
    date:any = ''

  constructor(private http: HttpClient) { }

    getContacts(): Observable<any>{
        return this.http.get('/api/v1/contacts')
    }

    getcontactById(contactId: string): Observable<any> {
        return this.http.get('/api/v1/contacts/' + contactId)
    }

    changeSetting(
        formSetting: String
        ): Observable<any>{
            const contact = formSetting
            return this.http.patch('/api/v1/contacts/change/', contact)
    }

    account(i:any) {
      return this.date = i
    }

    accountChange(account:string): Observable<any>{
            return this.http.patch('/api/v1/users/accountUpdate', account)
    }

}
