import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoPersonComponent } from './components/person/info-person/info-person.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { ListPersonComponent } from './components/person/list-person/list-person.component';


const routes: Routes = [
  {path: '', component:ListPersonComponent},
  {path: 'add', component:AddPersonComponent},
  {path: 'person/:idPerson', component:InfoPersonComponent},
  {path: 'update/:idPerson', component:AddPersonComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
