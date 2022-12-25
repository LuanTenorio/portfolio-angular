import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeUserInfoComponent } from 'src/app/view/generalComponents/change-user-info/change-user-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {

  constructor(
    private dialog: MatDialog,
    private route: Router,
  ) {}

  openUserChangeInfo(){
    const dialogRef = this.dialog.open(ChangeUserInfoComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
    })
  }

  logout(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }

}
