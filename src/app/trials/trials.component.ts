import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.css']
})
export class TrialsComponent implements OnInit {
  articulos: any;
  title = 'PV-monitoring-web';
  nombre = '';
  apellido = '';
  edad = 17;
  email = 'rpablo@gmail.com';
  sueldos = [1700, 1600, 1900];
  activo = true;
  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });
  ngOnInit() {     this.http.get("https://scratchya.com.ar/vue/datos.php")
  .subscribe(
    resultado => {
      this.articulos = resultado;
    }
  );}

  esActivo() {
    if (this.activo)
      return 'Trabajador Activo';
    else
      return 'Trabajador Inactivo';
  }

  ultimos3Sueldos() {
    let suma=0;
    for(let x=0; x<this.sueldos.length; x++)
      suma+=this.sueldos[x];
    return suma;
  }

  incrementar() {
    this.edad++;
  }

  decrementar() {
    this.edad--;
  }
}

