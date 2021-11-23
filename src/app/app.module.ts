import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { GridModule, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridAllModule,
    AppRoutingModule,
    ContextMenuModule,
    CheckBoxModule
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
