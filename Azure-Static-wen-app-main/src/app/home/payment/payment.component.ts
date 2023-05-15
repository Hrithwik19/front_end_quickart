import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../Home-Interfaces/IProduct';
import { timer } from 'rxjs';
import { HomePageService } from '../HomePage-Services/home-page.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  timeLeft: number = 60;
  productName?:string
  productCost:number=0
  interval:any;
  id:number=0
  price:number=0
  name:string=''
  private readonly notifier: NotifierService;

backgroundImg:string='assets/backgroundImage.jpg'
  product:IProduct | undefined
  constructor(private active_route: ActivatedRoute,private service: HomePageService,notifierService: NotifierService){ 
    this.id = active_route.snapshot.params['id']
    this.price = active_route.snapshot.params['price']
    this.name = active_route.snapshot.params['name']
    this.notifier = notifierService;

    console.log(this.name)
  }

  ngOnInit(): void {

    this.startTimer()
  }


  Buy(f:NgForm){
    this.service.MakePayment(f.value.CardNumber,f.value.CVV, f.value.Expiry, this.id, this.price).subscribe(
      res => {
       
        console.log(res);
        if(res==true)
        {
          this.showNotification('success','Payment Success!')
        }
        else
          this.showNotification('error','Payment Failed')

      },
      err => {
       
        console.log('error occured');
      }
    )
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  public showNotification(type: string, message: string): void {

    this.notifier.notify(type, message);
  }
}
