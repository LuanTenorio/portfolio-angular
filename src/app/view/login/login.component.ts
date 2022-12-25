import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBilder: FormBuilder,
    private route: Router,
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    console.log('login');
    const spinner = document.getElementById('spinner')
    if(spinner !== null){
      spinner.style.display = 'none'
      spinner.style.visibility = 'hidden'
    }

    this.form = this.formBilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  verifyUser(){
    if(this.form.valid){
      this.spinnerAnimate(true)
      this.http.post<string>('http://localhost:8000/api/verifyUser', this.form.value).subscribe(
        token => {
          if(token.split('.').length !== 3)
            return

          localStorage.setItem('token', token)
          this.route.navigate(['/painel'])
        },
        error => {
          this.spinnerAnimate(false)
          localStorage.removeItem('token')
          this.alertService.addAlert('Erro ao enviar requizição')
        }
      )
    }else
      this.alertService.addAlert('Preencha todos os campos do formulario')
  }

  spinnerAnimate(show: boolean){
    const spinner = document.getElementById('spinner')
    if(spinner == null)
      return

    spinner.style.display = show ? 'flex' : 'none'
    spinner.style.visibility = show ? 'visible' : 'hidden'
  }

}
