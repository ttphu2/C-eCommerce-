import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/shared/models/product';
import { AdminService } from '../admin.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {
  displayedColumns: string[] = ['select','id', 'name', 'price', 'brand'];
  products: IProduct[];
  @ViewChild('TableOnePaginator', {static: false}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: false}) tableOneSort: MatSort;
  dataSource: MatTableDataSource<IProduct>;
  selection = new SelectionModel<IProduct>(true, []);
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(){
    this.adminService.getAllProducts().subscribe((response) => {
        this.products = response;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.tableOnePaginator;
        this.dataSource.sort = this.tableOneSort;
        console.log(this.products);
    });
  }
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: IProduct): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showData(){
   // console.log(this.selection.selected);
  }
}
