import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor(public dialog: MatDialog,private route: ActivatedRoute,
    private router: Router,) { }
  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {width:'600px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(['/profile', 1]); // giriş yapan kullanıcı olacak
    });
  }
}
