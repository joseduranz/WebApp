import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


declare var botonHome: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'AUTOLUXURY';

  constructor() { 
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTo plugin
  }

  ScrollTriger(elemento: HTMLElement){
    gsap.to(elemento, {
      scrollTrigger: {
          end: "center top",
          scrub: 0
      },
      scaleY: -2,
      translateY: -240
  });
  }

  ngOnInit(): void {
    botonHome()
  }

}
