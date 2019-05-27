import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule  } from '@angular/common/http';
import { DataFilterPipe } from './datafilterpipe';
import { MomentPipe } from '../../pipes/moment.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'ngx-moment';
import { Base64Pipe } from '../../pipes/base64.pipe';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    DataTableModule,
    HttpClientModule,
    ModalModule.forRoot(),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  declarations: [
    DashboardComponent,
    DataFilterPipe,
    MomentPipe,
    Base64Pipe
  ]
})
export class DashboardModule { }
