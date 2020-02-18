import { Component } from '@angular/core';
import { NavController, Keyboard } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddPasswordPage } from '../add-password/add-password';
import { AlertController, LoadingController } from 'ionic-angular';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public db: SQLiteObject;
  public todos = [];
  username;
  background
  sql;
  displayUser = new Array();
  email;
  email_address
  constructor(private keyboard: Keyboard, public loadingCtrl: LoadingController, public navCtrl: NavController, public sqliteService: SqliteProvider, public alertCtrl: AlertController) {
  }
  displayDta() {
   
    if (this.email_address == undefined || this.email_address == null) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter your email address',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.sqliteService.checkingEmail(this.email_address).then((data: any) => {
        this.displayUser = data[0]
        console.log(this.displayUser)
        let obj = {
          email: data[0].email
        }
        if (obj.email == this.email_address) {
          console.log("true")
          this.navCtrl.push(AddPasswordPage, { orgObject: this.displayUser });
        }
        else{
          console.log("false")
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Could not retrieve user account details using the provided email address.Please connect to the network to get the latest user account details',
            buttons: ['OK']
          });
          alert.present();
        }
      })
    }


  }


  onInput(e) {
    console.log(e)
  }

}

