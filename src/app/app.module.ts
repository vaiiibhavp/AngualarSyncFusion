import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { GridModule, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { sampleData } from './datasource';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,

    FormsModule,

    ReactiveFormsModule,

    TreeGridAllModule,

    AppRoutingModule,

    ContextMenuModule,

    CheckBoxModule,

    DialogModule,

    DropDownListModule,

    HttpClientModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    PageService,
    SortService,
    FilterService, 
    EditService,
    ToolbarService,
    FreezeService,
    SelectionService,
    sampleData,
    HttpClient
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
