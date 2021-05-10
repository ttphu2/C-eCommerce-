import { Component, OnInit } from '@angular/core';
import { IProduct, IWish } from 'src/app/shared/models/product';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products: IWish[];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadWishList();

  }
  loadWishList()
  {
    this.accountService.getWishList().subscribe((response: any) => {
      this.products = response;
      console.log(this.products);
    });
  }
  handleRemoveFromWishList(id: number){
    this.accountService.removeFromWishlist(id).subscribe(() => {
      this.products = this.products.filter(i => i.productId !== id);
    })
  }

}
