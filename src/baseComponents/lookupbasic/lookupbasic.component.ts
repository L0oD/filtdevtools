import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lookupbasic',
  templateUrl: './lookupbasic.component.html',
  styleUrls: ['./lookupbasic.component.scss'],
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule]
})
export class LookupbasicComponent implements OnInit {
  private _data: any[] = [];
  @Input() 
  set data(value: any[]) {
    this._data = value;
    this.generateColumns();
  }
  get data(): any[] {
    return this._data;
  }

  @Input() cols: Column[] = [];
  @Output() rowSelect: EventEmitter<any> = new EventEmitter();
  @Output() onRowDoubleClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log('data:', this.data);
    console.log('columns:', this.cols);
  }

  private generateColumns() {
    if (this.data.length > 0) {
      this.cols = Object.keys(this.data[0]).map(key => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
      }));
    }
  }

  rowSelectHandler(event: any) {
    console.log('rowSelectHandler:', event);
    this.rowSelect.emit(event);
  }
  
  onRowDoubleClickHandler(rowData: any) {
    console.log('onRowDoubleClickHandler:', rowData);
    this.onRowDoubleClick.emit(rowData);
  }
}