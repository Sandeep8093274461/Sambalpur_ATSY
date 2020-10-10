import { UpdateRrtComponent } from './update-rrt/update-rrt.component';
import { AddRrtComponent } from './add-rrt/add-rrt.component';
import { UpdateZoneComponent } from './update-zone/update-zone.component';
import { AddZoneComponent } from './add-zone/add-zone.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ccdRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                redirectTo: 'addZone',
                pathMatch: 'full'
            }, {
                path: 'addZone',
                component: AddZoneComponent
            }, {
                path: 'updateZone',
                component: UpdateZoneComponent
            }, {
                path: 'addRrt',
                component: AddRrtComponent
            }, {
                path: 'updateRrt',
                component: UpdateRrtComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ccdRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
