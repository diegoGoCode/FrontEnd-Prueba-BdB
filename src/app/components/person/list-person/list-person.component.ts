import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { GeneralResponse } from 'src/app/models/response/general-response';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  generalReponse:GeneralResponse;
  listPerson:Person[] = [];
  suscription:Subscription;
  columns:any[] = [
    {column:'Full Name'},
    {column:'Birth'},
    {column:'Actions'},
  ]

  constructor(private personService:PersonService, private alert:SweetAlertService, private route:Router) { }

  ngOnInit() {
    this.getPersons();
    this.refresh();
  }

  goToAddPerson(){
    this.route.navigate(['add']);
  }

  getPersons(){
    this.personService.getPersons().subscribe(
      data => {
        this.generalReponse = data;
        console.log(this.generalReponse);
        this.listPerson = this.generalReponse.data
      }
    )
  }

  deletePerson(idPerson:number){
    this.personService.deletePerson(idPerson).subscribe(
      data => {
        this.alert.notification('success', 'Record deleted');
      },
      error => {
        this.generalReponse = error.error;
        if(this.generalReponse.apiError && this.generalReponse.apiError.messageUser){
          this.alert.notification('error', this.generalReponse.apiError.messageUser);
        }
      }
    )
  }

  goToInfoPerson(idPerson:number){
    this.route.navigate(['person', idPerson]);
  }

  goToUpdatePerson(idPerson:number){
    this.route.navigate(['update', idPerson])
  }

  refresh(){
    this.suscription = this.personService.refresh.subscribe(()=>{
      this.getPersons();
    })
  }

}
