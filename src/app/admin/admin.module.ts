import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UpdateZoneComponent } from './update-zone/update-zone.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AddRrtComponent } from './add-rrt/add-rrt.component';
import { UpdateRrtComponent } from './update-rrt/update-rrt.component';



@NgModule({
  declarations: [AddZoneComponent, UpdateZoneComponent, AdminSidebarComponent, AdminHeaderComponent, AdminFooterComponent, AddRrtComponent, UpdateRrtComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule,
    AdminRoutingModule
  ],
  exports: [
  ]
})
export class AdminModule { }
