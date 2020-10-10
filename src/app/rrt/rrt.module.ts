import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RrvisitComponent } from './rrvisit/rrvisit.component';
import { RrtService } from './rrt.service';
import { RrtRoutingModule } from './rrt-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RrtHomepageComponent } from './rrt-homepage/rrt-homepage.component';



@NgModule({
  declarations: [RrtHomepageComponent, RrvisitComponent],
  imports: [
    CommonModule,
    RrtRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RrtService]
})
export class RrtModule { }
