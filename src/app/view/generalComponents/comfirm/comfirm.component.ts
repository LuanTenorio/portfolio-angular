import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.css']
})
export class ComfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public text: string,
    ) { }

  ngOnInit(): void {
  }

  close = (confirm: boolean) => this.dialogRef.close(confirm)

}
