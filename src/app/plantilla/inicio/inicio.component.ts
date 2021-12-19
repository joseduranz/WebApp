import { Component, OnInit } from '@angular/core';



declare var  gsapJava : any;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  siteKey:string;

  constructor() { 
    this.siteKey = '6Lfn27EdAAAAAGjsfkhwTTcBBTE7NsM02buqj-29';
  }

  ngOnInit(): void {
    gsapJava()

  }

  
}
