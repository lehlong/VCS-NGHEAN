import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-display-ticket',
  templateUrl: './display-ticket.component.html',
  styleUrls: ['./display-ticket.component.scss']
})
export class DisplayTicketComponent implements OnInit {

  textToShow: string = '';
  textToSpeak: string = 'Xin mời khách hàng có biển số 29H123456 vào họng bơm số 1';
  constructor() {

  }
  ngOnInit(): void {
    this.speak();
    //setTimeout(function () { window.location.reload() }, 10000)
  }

  speak(){
    let speak = new SpeechSynthesisUtterance();
    speak.text = this.textToSpeak;
    speak.lang = "vi-VN";
    window.speechSynthesis.speak(speak);
  }
}
