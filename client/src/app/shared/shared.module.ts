import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PhotoWidgetComponent } from './components/photo-widget/photo-widget.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatTableModule} from '@angular/material/table';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
// other imports omitted
@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent,
    OrderTotalsComponent, TextInputComponent, StepperComponent, BasketSummaryComponent, PhotoWidgetComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterModule,
    CurrencyMaskModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    ImageCropperModule,
    ButtonsModule.forRoot(),
    MatTableModule,
    BsDatepickerModule.forRoot(),
    MatPaginatorModule,
    MatSortModule


  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    CurrencyMaskModule,
    NgxGalleryModule,
    TabsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    PhotoWidgetComponent,
    ButtonsModule,
    MatTableModule,
    BsDatepickerModule,
    MatPaginatorModule,
    MatSortModule
   ]
})
export class SharedModule { }
