import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController} from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bill: number;
  totalBill: number;
  happiness: number;
  servicerate: any = 'nice';
  tipPercent: number;
  numOfPerson: number;
  tipAmount: number;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

  }

  newInput(billAmt){
    this.bill = billAmt;
  }

  showChart(billAmount,tipAmount){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement,{
        type: 'doughnut',
        data:
          {
          labels: ['Bill','Tips'],
          datasets:
          [{
            label: 'Summary',
            data: [billAmount, tipAmount],
            backgroundColor:
            [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            hoverBackgroundColor:
            [
              "#FF6384",
              "#36A2EB"
            ]
          }]
        }
      });
  }
  showChartPage(){
    this.calculateTip();
    let billAmt = this.bill;
    let tipAmt = this.tipAmount;
    this.showChart(billAmt,tipAmt);
  }
  GetTipAmount(){
    if(this.bill > 0) {
      this.showChartPage();
      this.foodRateHtmlAppend();
      this.foodServiceHtmlAppend();
      document.getElementById("myNav").style.width = "100%";
    } else {
      this.toastCtrl.create({
        message: 'Enter the bill amount please.',
        duration: 2000,
        cssClass: 'amountError'
      }).present();
    }
  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  foodRate: number[] = [];

  HappinessRange($event) {
    this.foodRate.push($event);
    this.happiness = $event;
    console.log(this.foodRate);
  }

  foodRateHtmlAppend(){
    var paragraph = document.getElementById("pFood");
    var text;
    switch (this.foodRate[this.foodRate.length-1]){
      case 0:
        text = document.createTextNode("Its shit for sure.")
      case 20:
        text = document.createTextNode("Food was alright.");
        break;
      case 40:
        text = document.createTextNode("Food was great.");
        break;
      case 60:
        text = document.createTextNode("Food was very great.");
        break;
      case 80:
        text = document.createTextNode("Food was awesome.");
        break;
      case 100:
        text = document.createTextNode("Food was outstanding.");
        break;
      default:
        text = document.createTextNode("Lovely Weekend.");
    }
    paragraph.appendChild(text);
  }
  foodServiceHtmlAppend(){
    var paragraph = document.getElementById("pService");
    var text = document.createTextNode(this.servicerate);
    paragraph.appendChild(text);
  }

  calculateTip(){
    this.tipAmount = parseInt((this.bill*(this.tipPercent/100)).toFixed(2));
    this.totalBill = (this.tipAmount + this.bill);
  }
}
