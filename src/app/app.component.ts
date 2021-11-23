import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './datasource';
import { TreeGridComponent, RowDDService, SelectionService,ColumnChooserService,FilterService,SortService} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RowDDService, SelectionService,ColumnChooserService,FilterService,SortService ]
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
  public filterSettings!: Object;
  public sortSettings!: Object;
  public contextMenuItems!: Object;

  // @ViewChild('contextmenu')
  //   public contextmenu!: ContextMenuComponent;

  @ViewChild('treegrid')
    public treegrid!: TreeGridComponent;

    columns = [
      { field: 'taskID', headerText: 'Task ID', textAlign:'Right', width:'40', format:'', isPrimaryKey:'true', validationRules:'orderidrules',editType:'' },
      { field: 'taskName', headerText: 'Task Name', textAlign:'Left', width:'200', format:'',isPrimaryKey:'false', validationRules:'customeridrules', editType:''},
      { field: 'startDate', headerText: 'Start Date', textAlign:'Right', format:'yMd',width:'90', isPrimaryKey:'false', validationRules:'',editType:'datepickeredit'},
      { field: 'duration', headerText: 'Duration', textAlign:'Right', format:'',width:'80', isPrimaryKey:'false', validationRules:'',editType:''}
    ];

    // public menuItems: MenuItemModel[] = [
    //   {
    //       text: 'Edit Column',
    //       iconCss: 'e-cm-icons e-edit',
          
    //   },
    //   {
    //       text: 'New Column',
    //       iconCss: 'e-cm-icons e-add'
    //   },
    //   {
    //       text: 'Delete Column',
    //       iconCss: 'e-cm-icons e-delete',
    //   }];

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
    this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };

    this.contextMenuItems= [
      { text: 'Add Column', target: '.e-headercontent', id: 'addcol' },
      { text: 'Edit Column', target: '.e-headercontent', id: 'editcol' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'delcol' },
    ]

    
    
  }

  contextMenuOpen (arg?: BeforeOpenCloseEventArgs): void {
    let elem: Element = arg?.event.target as Element;
    // let row = elem.closest('.e-row');
    // let uid = row && row.getAttribute('data-uid');
    let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
    //console.log(items)
   
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style','display: none;');
    }
    
    document.querySelectorAll('li#addcol')[0].setAttribute('style', 'display: block;');
    document.querySelectorAll('li#editcol')[0].setAttribute('style', 'display: block;');
    document.querySelectorAll('li#delcol')[0].setAttribute('style', 'display: block;');
    
      
    
   
  }

  contextMenuClick (args?: MenuEventArgs): void {
     if(args?.item.text == 'Add Column')
     {
       alert(args?.item.text)
       this.columns.push({ field: 'status', headerText: 'Status', textAlign:'Right', format:'',width:'80', isPrimaryKey:'false', validationRules:'',editType:''})
     }
     else {
       alert(args?.item.text)
     }
  }

}
