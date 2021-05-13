import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/shared/models/order';
import { AdminService } from '../admin.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, Column, Decoration, Margins, TDocumentDefinitions, TFontFamilyTypes } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})

export class AdminOrdersComponent implements OnInit {
  orders: IOrder[];
  displayedColumns: string[] = ['id', 'email','orderDate','status', 'total', 'action'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  dataSource: MatTableDataSource<IOrder>;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    return this.adminService.getOrders().subscribe(response => {
      this.orders = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.tableOnePaginator;
      this.dataSource.sort = this.tableOneSort;
      console.log(this.orders);
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  generatePDF(action = 'open', id: number) {
    let order = this.orders.find(i => i.id == id);

    var docDefinition = {
    content: [
      {
        fontSize: 16,
        alignment: 'center' as Alignment,
        color: '#047886',
        text: 'Shoes shop'
      },
      {
        text: 'INVOICE',
        fontSize: 20,
        bold: true,
        alignment: 'center' as Alignment,
        decoration: 'underline' as Decoration,
        color: 'skyblue'
      },
      {
        text: 'Customer Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
          {
            text: 'Fullname: ' + order!.shipToAddress.firstName + ' ' + order!.shipToAddress.lastName,
            bold: true
          },
          { text: 'Address: ' + order!.shipToAddress.street + ' ' + order!.shipToAddress.city },
          { text: 'Email: ' + order!.buyerEmail },
          { text: 'City: ' + order!.shipToAddress.city }
          ] as Column,
          [
            {
              text: `Date: ${new Date().toLocaleString()}`,
              alignment: 'right'
            },
            {
              text: `Bill No : ${order!.id}`,
              alignment: 'right'
            }
          ] as Column
        ]
      },
      {
        text: 'Order Details',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Product', 'Price', 'Quantity', 'Amount'],
            ...order!.orderItems!.map(p => ([p.productName, p.price, p.quantity, (p.price* p.quantity).toFixed(2)]))!,
            [{text: 'Method Delivery', colSpan: 2}, {}, order!.deliveryMethod , order!.shippingPrice.toFixed(2)],
            [{text: 'Total Amount', colSpan: 3}, {}, {}, order!.total.toFixed(2)]
          ]
        }
      },
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline' as Decoration,
        fontSize: 14,
        margin: [0, 15,0, 15] as Margins
      }
    }

  };
    if(action === 'download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }
  }


}
