import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController} from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  billAmount: number;
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

  showChart(billAmt,tipPercent){
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement,{
        type: 'doughnut',
        data: {
          labels: ['Bill','Tips'],
          datasets:
          [{
            label: 'Summary',
            data: [billAmt, ((tipPercent/100)*billAmt)],
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
  // public chartLabel: string[]=['Bill','Tips'];
  // public chartData: number[]=[this.billAmount,this.billAmount*(this.tipPercent/100)];
  // public chartType: string = 'doughnut';

  GetTipAmount(){

    if(this.billAmount >= 0) {
      this.showChart(this.billAmount,this.tipPercent);
      document.getElementById("myNav").style.width = "100%";
    } else {
      this.toastCtrl.create({
        message: 'Enter the bill amount please.',
        duration: 2000,
        cssClass: 'amountError'
      }).present();
    }
    if(this.servicerate != undefined){
      console.log(this.servicerate);
    }
    console.log(this.tipPercent);
    console.log(this.numOfPerson);
  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  calculateTip(amt,percent){
    return (amt*(percent/100)).toFixed(2);
  }

  HappinessRange($event) {
    this.happiness = $event;
    console.log(this.happiness);
    if (this.happiness < 20) {
      console.log('The food was bad');
    }
  }
}
