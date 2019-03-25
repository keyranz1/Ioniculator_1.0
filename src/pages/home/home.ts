import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController} from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bill: number;
  happiness: number;
  servicerate: any = 'nice';
  tipPercent: number;
  numOfPerson: number;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

  }

  newInput(billAmt){
    this.bill = billAmt;
  }

  showChart(billAmount,tipPercent){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement,{
        type: 'doughnut',
        data:
          {
          labels: ['Bill','Tips'],
          datasets:
          [{
            label: 'Summary',
            data: [this.bill, ((tipPercent/100)*billAmount)],
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

  //This might be used in future versions
  // public chartLabel: string[]=['Bill','Tips'];
  // public chartData: number[]=[this.bill,(this.bill*(this.tipPercent/100))];
  // public chartType: string = 'doughnut';

  GetTipAmount(){

    if(this.bill > 0) {
      this.showChartPage();
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
  }

  showChartPage(){
    let billAmt = this.bill;
    let tipPct = this.tipPercent;
    this.showChart(billAmt,tipPct);

  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
    //refreshes the chart js data
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  HappinessRange($event) {
    this.happiness = $event;
    console.log(this.happiness);
    if (this.happiness < 20) {
      console.log('The food was bad');
    }
  }
}
