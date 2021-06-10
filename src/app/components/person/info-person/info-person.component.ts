import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person';
import { GeneralResponse } from 'src/app/models/response/general-response';
import { PersonService } from 'src/app/services/person.service';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.css']
})
export class InfoPersonComponent implements OnInit {

  generalResponse:GeneralResponse;
  personInfo:Person = null;
  constructor(private personService:PersonService,
              private alert:SweetAlertService,
              private route:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.loadPerson();
  }

  loadPerson(){
    this.activatedRoute.params.subscribe(params => {
      let idPerson = params['idPerson'];
      console.log('id'+idPerson);
      if(idPerson){
        this.personService.getPerson(idPerson).subscribe(
          data => {
            this.generalResponse = data;
            this.personInfo = this.generalResponse.data;
            console.log(this.personInfo.fullName);
          },
          error => {
            this.generalResponse = error.error;
            if(this.generalResponse.apiError && this.generalResponse.apiError.messageUser){
              this.alert.notification('error', this.generalResponse.apiError.messageUser);
              this.goToPersons();
            }
          }
        )
      }
    })
  }

  goToPersons(){
    this.route.navigate(['']);
  }

}
