import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { GeneralResponse } from 'src/app/models/response/general-response';
import { PersonService } from 'src/app/services/person.service';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  generalResponse:GeneralResponse;
  formPerson:FormGroup;
  personEdit:Person = null;
  nameImg:string = 'father.png';
  maxDate;

  constructor(private personService: PersonService,
              private formBuilder:FormBuilder,
              private alert:SweetAlertService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.maxDate = new Date().toISOString().slice(0, 10);;
    this.formPerson = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-z-A-Z ]+$/)]],
      birth: ['', [Validators.required]],
      type: [1, [Validators.required]]
    });
    this.loadPerson();
  }

  loadPerson(){
    this.activatedRoute.params.subscribe(params => {
      let idPerson = params['idPerson'];
      if(idPerson){
        this.personService.getPerson(idPerson).subscribe(
          data => {
            this.generalResponse = data;
            this.personEdit = this.generalResponse.data;
            console.log(this.personEdit.fullName);
            this.formPerson.setValue({
              fullName: this.personEdit.fullName,
              birth: this.personEdit.birth,
              type: this.personEdit.typePerson
            })
            this.changeImg(this.personEdit.typePerson);
          },
          error => {
            this.generalResponse = error.error;
            if(this.generalResponse.apiError && this.generalResponse.apiError.messageUser){
              this.alert.notification('error', this.generalResponse.apiError.messageUser);
              this.router.navigate(['']);
            }
          }
        )
      }
    })
  }

  changeImg(type:number){
    if(type == 1){
      this.nameImg = 'father.png';
    }else if(type == 2){
      this.nameImg = 'mother.png';
    }else{
      this.nameImg = 'children.png';
    }
  }

  goToPersons(){
    this.router.navigate(['']);
  }

  savePerson(){
    // if(!this.formPerson.valid){
    //   return this.alert.notification("error", "Form invalid");
    // }

    let personRequest = this.formPerson.value as Person;
    personRequest.fullName = this.formPerson.controls['fullName'].value;
    personRequest.birth = this.formPerson.controls['birth'].value;
    personRequest.typePerson = this.formPerson.controls['type'].value;
    this.personService.savePerson(personRequest).subscribe(
      data => {
        this.formPerson.reset();
        this.formPerson.controls['type'].setValue(1);
        this.changeImg(1);
        this.alert.notification('success', 'Record saved');
      },
      error => {
        this.generalResponse = error.error;
        if(this.generalResponse.apiError && this.generalResponse.apiError.messageUser){
          this.alert.notification('error', this.generalResponse.apiError.messageUser);
        }
      }
    )
  }

  updatePerson(){
    // if(!this.formPerson.valid){
    //   return this.alert.notification('error', 'Form invalid');
    // }

    let personUpdateRequest = this.formPerson.value as Person;
    personUpdateRequest.id = this.personEdit.id;
    personUpdateRequest.fullName = this.formPerson.controls['fullName'].value;
    personUpdateRequest.birth = this.formPerson.controls['birth'].value;
    personUpdateRequest.typePerson = this.formPerson.controls['type'].value;
    this.personService.updatePerson(personUpdateRequest).subscribe(
      data => {
        console.log(data);
        this.alert.notification('success', 'Updated record');
        this.router.navigate(['']);
      },
      error => {
        this.generalResponse = error.error;
        if(this.generalResponse.apiError && this.generalResponse.apiError.messageUser){
          this.alert.notification('error', this.generalResponse.apiError.messageUser);
        }
      }
    )
  }
}
