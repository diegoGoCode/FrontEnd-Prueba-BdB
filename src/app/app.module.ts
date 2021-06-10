import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListPersonComponent } from './components/person/list-person/list-person.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonService } from './services/person.service';
import { InfoPersonComponent } from './components/person/info-person/info-person.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListPersonComponent,
    AddPersonComponent,
    InfoPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
