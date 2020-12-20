import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AircraftStatusComponent } from '../../aircraft-status/aircraft.status.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'general-status',      component: DashboardComponent },
    { path: 'aircraft-status/:id',        component: AircraftStatusComponent }
];
