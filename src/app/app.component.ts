import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './datasource';
import { TreeGridComponent, RowDDService, SelectionService,ColumnChooserService,FilterService,SortService,EditService} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Column } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RowDDService, SelectionService,ColumnChooserService,FilterService,SortService,EditService ]
})
export class AppComponent implements OnInit {
  title = 'AngualarSyncFusion';

  columnform = new FormGroup({})

  constructor(){
    this.columnform = new FormGroup({
      column_name : new FormControl('',[Validators.required]),
      column_type : new FormControl('',[Validators.required]),
      column_width : new FormControl('',[Validators.required]),
      column_font_size : new FormControl(''),
      column_font_color : new FormControl(''),
      column_background_color : new FormControl(''),
      column_alignment : new FormControl('',Validators.required),
    })
  }

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
  headerText = ''
  itemIndex = -1
  public columns = [
    { field: 'taskID', headerText: 'Task ID', textAlign:'Right', width:'40', fontSize: '200', format:'',editType:'' },
    { field: 'taskName', headerText: 'Task Name', textAlign:'Left', width:'200', format:'', editType:'stringedit'},
    { field: 'startDate', headerText: 'Start Date', textAlign:'Right', format:'yMd',width:'90', validationRules:'',editType:'datepickeredit'},
    { field: 'duration', headerText: 'Duration', textAlign:'Right', format:'',width:'80', validationRules:'',editType:'stringedit'}
  ];
  // @ViewChild('contextmenu')
  //   public contextmenu!: ContextMenuComponent;

  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

  @ViewChild('Dialog')
  public Dialog!: DialogComponent;

  @ViewChild('column_datatype')
  public column_datatype!: DropDownListComponent;

  @ViewChild('column_alignment')
  public column_alignment!: DropDownListComponent;

  public target: string = '.control-section';

  public header: string = '';
  public showCloseIcon: Boolean = true;
  public width: string = '50%';

  
    

  public data_types: Object[] = [
    { name: 'Text' , value:'stringedit'},
    { name: 'Num' , value:'numericedit'},
    { name: 'Date', value:'datepickeredit' },
    { name: 'Boolean', value:'booleanedit' },
    { name: 'DropDownList',value:'dropdownedit' },
  ];

  public column_alignments: Object[] = [
    { name: 'Right' },
    { name: 'Left' },
    { name: 'Center' },
  ];

  public fields: Object = { text: 'name', value: 'value' };
  public height: string = '220px';
  public waterMark: string = 'Select a data type';
  public value: string = '';

  public alignment_fields: Object = { text: 'name', value: 'name' };
  public alignment_height: string = '220px';
  public alignment_waterMark: string = 'Select a data type';
  public alignment_value: string = '';

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
      { text: 'Add Column', target: '.e-headercontent', id: 'addcol'},
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
    

    elem.querySelectorAll('.e-headertext').forEach(e => {
      this.headerText = String(e.textContent);
    })

    if(this.headerText)
    {
      document.querySelectorAll('li#editcol')[0].setAttribute('style', 'display: block;');
      document.querySelectorAll('li#delcol')[0].setAttribute('style', 'display: block;');
    }
      
    
   
  }

  contextMenuClick (args?: MenuEventArgs): void {
    if(args?.item.text == 'Add Column')
    {
      this.itemIndex = -1
      this.header = args?.item.text;
      this.Dialog.show();
    }
    else if(args?.item.text == 'Edit Column')
    {
      this.header = args?.item.text;
      let item = this.columns.find(c => c.headerText == this.headerText)
      this.itemIndex = this.columns.findIndex(item => item.headerText === this.headerText)
      this.columnform.setValue({
        column_name : item?.headerText,
        column_type : item?.editType,
        column_width : item?.width,
        column_font_size : '',
        column_font_color : '',
        column_background_color : '',
        column_alignment : item?.textAlign,
      })
      this.Dialog.show();
    }
    else {
      this.itemIndex = this.columns.findIndex(item => item.headerText === this.headerText)
      this.columns.splice(this.itemIndex,1)
      this.itemIndex = -1
      //alert(args?.item.text)
    }
  }

  public onChange(args: any): void {
    // let value: Element = document.getElementById('value');
    // let text: Element = document.getElementById('text');
    // // update the text and value property values in property panel based on selected item in DropDownList
    // value.innerHTML = this.listObj.value.toString();
    // text.innerHTML = this.listObj.text;
  }

  onSubmit()
  {
    //console.log(this.columnform.value)

    if(this.columnform.status == 'INVALID')
    {
      return;
    }
    else
    {
      const value = this.columnform.value;
      if(this.itemIndex > -1)
      {
        let column = this.treegrid.getColumnByField(this.columns[this.itemIndex].field)
        column.headerText = value.column_name
        column.textAlign = value.column_alignment
        column.format = (value.column_type == 'datepickeredit' ? 'yMd' : '')
        column.width = value.column_width
        column.editType = value.column_type

        this.columns[this.itemIndex] = { field: column.field, headerText: value.column_name, textAlign:value.column_alignment, format:(value.column_type == 'datepickeredit' ? 'yMd' : ''),width:value.column_width, validationRules:'',editType:value.column_type}
        this.treegrid.refreshColumns()
      }
      else
      {
        this.columns.push({ field: value.column_name.replace(/\s/g, "").toLowerCase(), headerText: value.column_name, textAlign:value.column_alignment, format:(value.column_type == 'datepickeredit' ? 'yMd' : ''),width:value.column_width, validationRules:'',editType:value.column_type})
      }
      
      this.Dialog.hide();
      this.itemIndex = -1
     
    }
  }

}
