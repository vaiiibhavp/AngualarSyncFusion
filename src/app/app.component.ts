import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './datasource';
import { TreeGridComponent, RowDDService, SelectionService,ColumnChooserService,FilterService,SortService,EditService,FreezeService} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Column,RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RowDDService, SelectionService,ColumnChooserService,FilterService,SortService,EditService ]
})

export class AppComponent implements OnInit {
  title = 'AngualarSyncFusion';
  // rowSelected:
  columnform = new FormGroup({})
  rowform = new FormGroup({})

  constructor(private sampleData: sampleData){
    this.columnform = new FormGroup({
      column_name : new FormControl('',[Validators.required]),
      column_type : new FormControl('',[Validators.required]),
      column_width : new FormControl('',[Validators.required]),
      // column_font_size : new FormControl(''),
      // column_font_color : new FormControl(''),
      // column_background_color : new FormControl(''),
      column_alignment : new FormControl('',Validators.required),
    })

    this.rowform = new FormGroup({
      taskID : new FormControl('',[Validators.required]),
      taskname : new FormControl('',[Validators.required]),
      startdate : new FormControl('',[Validators.required]),
      duration : new FormControl('',[Validators.required]),
    })

  }

  public data: Object[] = [];
  public editSettings!: Object;
  public toolbar!: any;
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
  rowText : any
  itemIndex = -1
  rowIndex = -1
  rows : any
  copied = 0
  public columns = [
    { field: 'taskID', headerText: 'Task ID', textAlign:'Right', width:'40', fontSize: '200', format:'',editType:'rowEditing' },
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

  @ViewChild('rowDialog')
  public rowDialog!: DialogComponent;

  @ViewChild('column_datatype')
  public column_datatype!: DropDownListComponent;

  @ViewChild('column_alignment')
  public column_alignment!: DropDownListComponent;

  public target: string = '.control-section';

  public header: string = '';
  public showCloseIcon: Boolean = true;
  public width: string = '50%'; 
    
  public filtering: Boolean = false
  public sorting: Boolean = false

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
    this.sampleData.getData()
    .subscribe((data: any): void => {
      this.data = data.data;
    this.selectOptions = { type: 'Multiple' };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete','ColumnChooser'
    // , { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy'}
   ];
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
      { text: 'Add Next', target: '.e-row', id: 'addnext' },
      { text: 'Add Child', target: '.e-row', id: 'addchild' },
      { text: 'Edit Row', target: '.e-row', id: 'editrow' },
      { text: 'Delete Row', target: '.e-row', id: 'deleterow' },
      { text: 'Copy Rows', target: '.e-row', id: 'copyrows' },
      { text: 'Cut Rows', target: '.e-row', id: 'cutrows' },
      { text: 'Paste Next', target: '.e-row', id: 'pastenext' },
      { text: 'Paste Child', target: '.e-row', id: 'pastechild' },
    ]  
  });
  }

  changeMultiSort(event:any)
  {
    if(event.checked)
    {
      this.treegrid.allowSorting = true;
    }
    else
    {
      this.treegrid.allowSorting = false;
    }
  }

  changeFilterColumn(event:any)
  {
    if(event.checked)
    {
      this.treegrid.allowFiltering = true;
    }
    else
    {
      this.treegrid.allowFiltering = false;
    }
  }


  contextMenuOpen (arg?: BeforeOpenCloseEventArgs): void {
    let elem: Element = arg?.event.target as Element;  
    let row = elem.closest('.e-row');
    // let uid = row && row.getAttribute('data-uid');
    if(row == null){
    let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
   
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style','display: none;');
    }    
    
      elem.querySelectorAll('.e-headertext').forEach(e => {
        this.headerText = String(e.textContent);
      })
      if(this.headerText)
      {
        document.querySelectorAll('li#addcol')[0].setAttribute('style', 'display: block;');  
        document.querySelectorAll('li#editcol')[0].setAttribute('style', 'display: block;');
        document.querySelectorAll('li#delcol')[0].setAttribute('style', 'display: block;');
      }
      
    }else{
        this.rowText = String(row.textContent);
        if(this.rowText)
        {
          document.querySelectorAll('li#addnext')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#editrow')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#deleterow')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#addchild')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#copyrows')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#cutrows')[0].setAttribute('style', 'display: block;');
          document.querySelectorAll('li#editcol')[0].setAttribute('style', 'display: none;');
          document.querySelectorAll('li#delcol')[0].setAttribute('style', 'display: none;');
          document.querySelectorAll('li#addcol')[0].setAttribute('style', 'display: none;');  
          let allselectedrows = this.treegrid.getSelectedRows()
          if(this.copied > 0){
            document.querySelectorAll('li#pastenext')[0].setAttribute('style', 'display: block;');
            document.querySelectorAll('li#pastechild')[0].setAttribute('style', 'display: block;');
          }else{
            document.querySelectorAll('li#pastenext')[0].setAttribute('style', 'display: none;');
            document.querySelectorAll('li#pastechild')[0].setAttribute('style', 'display: none;');

          }
        }
    }    
  }

  contextMenuClick (args?: MenuEventArgs): void {
    if(args?.item.text == 'Add Column')
    {
      this.itemIndex = -1
      this.header = args?.item.text;
      this.Dialog.show();
    }else if(args?.item.text == 'Add Next')
    {
      this.rowIndex = -1
      this.header = args?.item.text;
      this.rowDialog.show();
    }else if(args?.item.text == 'Add Child')
    {
      this.rowIndex = 1
      this.header = args?.item.text;
      this.rowDialog.show();
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
    }else if(args?.item.text == 'Edit Row')
    {
      this.rowIndex = 0
      this.header = args?.item.text;
      let selectedrowtodel = this.treegrid.getSelectedRows()[0]as HTMLTableRowElement
      let updatedate = selectedrowtodel.cells[4].innerHTML
      let datearr = updatedate.split("/")
        if(parseInt(datearr[0])<10) 
      {
        datearr[0]='0'+datearr[0];
      } 

      if(parseInt(datearr[1])<10) 
      {
        datearr[1]='0'+datearr[1];
      }
      let finaldate = `${datearr[2]}-${datearr[1]}-${datearr[0]}`
      this.rowform.setValue({
        taskID: selectedrowtodel.cells[2].innerText,
        taskname: selectedrowtodel.cells[3].innerText,
        startdate: finaldate,
        duration: selectedrowtodel.cells[5].innerText,
      })
      this.rowDialog.show();
    }else if(args?.item.text == 'Delete Row')
    {
      let selectedrowtodel = this.treegrid.getSelectedRows()[0] as HTMLTableRowElement
      this.rowIndex = -1
      this.treegrid.deleteRow(selectedrowtodel)
    }else if(args?.item.text == 'Copy Rows'){
      this.copied = 1
      //show paste option
    }else if(args?.item.text == 'Cut Rows'){
      this.copied = 1
       //show paste option
    }else if(args?.item.text == 'Paste Next'){
      let allselectedrows = this.treegrid.getSelectedRows()
      this.copied = 0
      //hide paste option
    }else if(args?.item.text == 'Paste Child'){
      let allselectedrows = this.treegrid.getSelectedRows()
      this.copied = 0
    }
    else {
      this.itemIndex = this.columns.findIndex(item => item.headerText === this.headerText)
      this.columns.splice(this.itemIndex,1)
      this.itemIndex = -1
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

  onrowSubmit(){
    let selectedrow = this.treegrid.getSelectedRowIndexes()[0]
    if(this.rowform.status == 'INVALID')
    {
      return;
    }else{
      var value =  { 
        taskID: this.rowform.value.taskID,
         taskName: this.rowform.value.taskname,
         startDate: this.rowform.value.startdate,
         duration: this.rowform.value.duration,
      }; 
      if(this.rowIndex > -1)
      {        
        let selectedrowtodel = this.treegrid.getSelectedRows()[0]as HTMLTableRowElement
        let datearr = value.startDate.split("-") 
        let finaldate = `${datearr[2]}/${datearr[1]}/${datearr[0]}`
        selectedrowtodel.cells[2].innerHTML = value.taskID
        selectedrowtodel.cells[3].innerHTML = value.taskName
        selectedrowtodel.cells[4].innerHTML = finaldate
        selectedrowtodel.cells[5].innerHTML = value.duration
      }
      if(this.rowIndex == 1){
        this.treegrid.addRecord(value, selectedrow+1);     
      }
      else{  
        this.treegrid.addRecord(value, selectedrow+1);              
      }

       this.rowform.value.taskID = ''
       this.rowform.value.taskname = ''
       this.rowform.value.startdate = ''
       this.rowform.value.duration = ''

      this.rowDialog.hide();
      this.rowIndex = -1
    }
  }

}


