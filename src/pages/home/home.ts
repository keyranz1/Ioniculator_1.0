import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  billAmount: number;
  happiness: number;
  servicerate: any = 'nice';
  tipPercent: number = 15;
  numOfPerson: number = 1;
  tipAmount: number;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

  }

  GetTipAmount(){
    if(this.billAmount >= 0) {
      this.alertCtrl.create({
        title: 'Tip',
        message: 'This is the tip amount' + this.calculateTip(this.billAmount,this.tipPercent),
        buttons: ['Ok']
      }).present();
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

  calculateTip(amt,percent){
    return this.billAmount*(this.tipPercent/100);
  }

  HappinessRange($event) {
    this.happiness = $event;
    console.log(this.happiness);
    if (this.happiness < 20) {
      console.log('The food was bad');
    }
  }
}
