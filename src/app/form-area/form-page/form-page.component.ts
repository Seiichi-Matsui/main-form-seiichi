import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CntactService } from '../../common/form-service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  contact: any
  constructor(

    private route: ActivatedRoute,
    private cntactService: CntactService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const contactObservable = this.cntactService.getcontactById(params.get('contactId')!)
    contactObservable.subscribe(
      (date) => {
        this.contact = date
      },
      (error) => {

      }
    )
    })
  }
  }


