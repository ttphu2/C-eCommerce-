import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() addedToWishList: boolean;
  constructor(private basketService: BasketService, private shopService: ShopService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
   // this.basketService.addItemToBasket(this.product);
  }
  handleAddToWishList(){
    this.shopService.addToWishlist(this.product.id).subscribe(() => {
      this.addedToWishList = true;
    })
  }
  handleRemoveFromWishList(){
    this.shopService.removeFromWishlist(this.product.id).subscribe(() => {
      this.addedToWishList = false;
    })
  }

}
