import { Component, OnInit } from '@angular/core';
import { sampleData } from './datasource';
import { TreeGridComponent, RowDDService, SelectionService,ColumnChooserService} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RowDDService, SelectionService,ColumnChooserService ]
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
  public allowRowDragAndDrop : boolean = true;
  public selectOptions!: Object;


  ngOnInit(): void {
    this.data = sampleData;
    this.selectOptions = { type: 'Multiple' };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete','ColumnChooser'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = { pageCount: 5};
    this.allowRowDragAndDrop = true;
  }

}
