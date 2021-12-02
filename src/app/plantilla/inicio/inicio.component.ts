import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  siteKey:string;

  constructor() { 
    this.siteKey = '6LdwKGUdAAAAAMC0Y5gS7570bte16ti5WPCPalWJ';
  }

  ngOnInit(): void {
  }

  
}
