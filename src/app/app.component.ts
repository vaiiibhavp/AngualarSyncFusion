import { Component, OnInit } from '@angular/core';
import { sampleData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngualarSyncFusion';

  public data: Object[] = [];
  public editSettings!: Object;
  public toolbar!: string[];
  public orderidrules!: Object;
  public customeridrules!: Object;
  public freightrules!: Object;
  public pageSettings!: Object;
  public editparams!: Object;

  ngOnInit(): void {
    this.data = sampleData;

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = { pageCount: 5};
  }

}
