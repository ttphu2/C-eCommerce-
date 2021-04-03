import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CheckoutComponent, CheckoutAddressComponent, CheckoutReviewComponent,
    CheckoutPaymentComponent, CheckoutDeliveryComponent, CheckoutSuccessComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
