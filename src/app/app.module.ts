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
    DropDownListModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    PageService,
    SortService,
    FilterService, 
    EditService,
    ToolbarService,
    FreezeService,
    SelectionService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
