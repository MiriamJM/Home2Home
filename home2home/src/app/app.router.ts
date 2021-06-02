import { Routes, RouterModule } from '@angular/router';
import { TravelerProfileComponent } from './travelerProfile/travelerProfile.component';
import { PropertyComponent } from './property/property.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: 'property', component: PropertyComponent },
  { path: 'travelerProfile/:id', component: TravelerProfileComponent },
  { path: 'booking/:booking_id', component: BookingComponent },
];

export const routing = RouterModule.forRoot(routes, {useHash:true});
