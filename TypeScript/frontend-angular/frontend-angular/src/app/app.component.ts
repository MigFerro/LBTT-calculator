import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { AppService } from './app.service';
import { first } from 'rxjs';

const BASE_URL = 'http://localhost:8080';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  taxForm = this.formBuilder.group({
    price: 0,
    firstBuyer: 0
  });

  constructor(private service: AppService, private formBuilder: FormBuilder) {
  }

  getTax(){
    console.log("form values: ", this.taxForm.value);

    let {price, firstBuyer} = this.taxForm.value;

    if (typeof firstBuyer == "string"){
      firstBuyer = +firstBuyer;
    }
    
    let tax = -1;
    if (typeof price == "number" && typeof firstBuyer == "number"){
      tax = this.service.requestTax(price, firstBuyer);
    }
    
    if (tax != -1) {
      alert(tax)
    } else {
      console.log("someching went wrong :(")
    }
    this.taxForm.reset();
  }
}
