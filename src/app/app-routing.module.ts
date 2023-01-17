import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmailAppComponent } from './pages/email-app/email-app.component';
import { EmailDetailsComponent } from './pages/email-details/email-details.component';
import { EmailListComponent } from './cmps/email-list/email-list.component';
// import 
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'email', component: EmailAppComponent ,children: [{path: '', component:EmailListComponent },{path: ':id', component: EmailDetailsComponent},] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

