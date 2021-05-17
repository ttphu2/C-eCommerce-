import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  wishList: number[] = [];
  product: IProduct;
  quantity = 1;
  size = 0;
  myForm: FormGroup;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  addedToWishList: boolean = false;
  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute, private bcService: BreadcrumbService,
              private basketService: BasketService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.getWishList();
    this.loadProduct();
    this.myForm = this.formBuilder.group({
      radio: '38'
    });
  }
  getWishList(){
    this.shopService.getWishList().subscribe(response => {
      this.wishList = response;
      if(this.wishList.indexOf(Number(this.activeRoute.snapshot.paramMap.get('id'))) >= 0){
        this.addedToWishList = true;
       }else {
         this.addedToWishList = false;
       }
      console.log(this.wishList);
    }, error => {
      console.log(error);
    });
  }
  initializeGallery() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '600px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Contain,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo.pictureUrl,
        medium: photo.pictureUrl,
        big: photo.pictureUrl,
      });
    }
    return imageUrls;
  }
  addItemToBasket() {
    const checkStock = this.product.productSizes.find(x => x.size == this.size );
    if (this.size === 0){
      this.toastr.error('Please choose size', 'Size Error', {
        timeOut: 2000,
        positionClass: 'toast-bottom-center'
      });
      return;
    }
    if (this.quantity > checkStock!.quantity )
    {
      this.toastr.error('The quantity of this product is '+checkStock!.quantity, 'Quantity Error', {
        timeOut: 2000,
        positionClass: 'toast-bottom-center'
      });
      return;
    }
    if (!this.basketService.checkStockProductInBasket(this.product, this.quantity, this.size, checkStock!.quantity))
    {
      this.toastr.error('The quantity of this product is ' + checkStock!.quantity, 'Quantity Error', {
        timeOut: 2000,
        positionClass: 'toast-bottom-center'
      });
      return;
    }

   // this.product.productSizes.find(x => x.size == this.size )!.quantity = checkStock!.quantity - this.quantity;
    this.basketService.addItemToBasket(this.product, this.quantity, +this.size,checkStock!.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  onButtonGroupClick($event: any) {
    console.log($event);
  }
  decrementQuantity() {
    if (this.quantity > 1){
      this.quantity--;
    }
  }
  loadProduct(){
    this.shopService.getProduct(Number(this.activeRoute.snapshot.paramMap.get('id'))).subscribe(product => {
      this.product = product;

      this.bcService.set('@productDetails', product.name);
      this.initializeGallery();
    }, error => {
      console.log(error);
    });
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
