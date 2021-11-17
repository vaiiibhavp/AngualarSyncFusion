import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    AppRoutingModule
  ],
  providers: [PageService,
    SortService,
    FilterService, EditService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }