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
    let speak = new SpeechSynthesisUtterance();
    speak.text = this.textToSpeak;
    speak.voice = window.speechSynthesis.getVoices()[0];
    speak.lang = "vi-VN";
    speak.rate = 0.8;
    window.speechSynthesis.speak(speak);
    setTimeout(function () { window.location.reload() }, 10000)
  }
}
