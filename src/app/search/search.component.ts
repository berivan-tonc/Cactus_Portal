import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  select = "search";
  cat: string = "";
  itemId: number = 0;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      this.openDialog();

    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == undefined) {
        this.router.navigate(['/home']);
      }else{
        this.cat = res.cat;
        this.itemId = res.itemId;
      }

    });
  }

}
