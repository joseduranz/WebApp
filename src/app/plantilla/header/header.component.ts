import { Component, OnInit } from '@angular/core';

declare var menudesplegable: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  aparecerMenu(){
    menudesplegable();
  }
}
