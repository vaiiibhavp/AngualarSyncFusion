import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { GridModule, FreezeService, SelectionService } from '@syncfusion/ej2-angular-grids';
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
    ContextMenuModule
  ],
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
