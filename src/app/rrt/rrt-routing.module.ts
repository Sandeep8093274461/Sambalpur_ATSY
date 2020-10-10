import { RrvisitComponent } from './rrvisit/rrvisit.component';
import { RrtHomepageComponent } from './rrt-homepage/rrt-homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ccdRoutes: Routes = [
    {
        path: 'rrt',
        children: [
            {
                path: '',
                redirectTo: 'homePage',
                pathMatch: 'full'
            }, {
                path: 'homePage',
                component: RrtHomepageComponent
            }, { 
                path:"rrtVisit", 
                component: RrvisitComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ccdRoutes)],
  exports: [RouterModule]
})
export class RrtRoutingModule { }
