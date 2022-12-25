import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {

  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ChangeUserInfoComponent>,
    private formBilder: FormBuilder,
    private painelControlService: PainelControlService,
  ) {
    this.form = this.formBilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      currentPassword: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

  changeInfos(){
    if(this.form.valid){
      this.painelControlService.spinnerAnimate(true)
      this.painelControlService.changeUserInfo(this.form.value).subscribe(
        isChanged => {
          this.painelControlService.spinnerAnimate(false)
          this.dialogRef.close()
        },
        error => {
          this.painelControlService.alert('Erro ao alterar informações')
          this.painelControlService.spinnerAnimate(false)
        }
      )
    }
  }

}
