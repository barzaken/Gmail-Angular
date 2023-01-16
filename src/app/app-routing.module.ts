import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemAppComponent } from './pages/item-app/item-app.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ItemListComponent } from './cmps/item-list/item-list.component';
// import 
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'item', component: ItemAppComponent ,children: [{path: '', component:ItemListComponent },{path: ':id', component: ItemDetailsComponent},] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

