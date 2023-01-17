import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { reducers, metaReducers } from './store/store';
import { AppEffects } from './store/app.effects';

import { AppComponent } from './root-component/index';
import { HomeComponent } from './pages/home/home.component';
import { EmailAppComponent } from './pages/email-app/email-app.component';

import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { EmailListComponent } from './cmps/email-list/email-list.component';
import { EmailEditComponent } from './cmps/email-edit/email-edit.component';
import { EmailPreviewComponent } from './cmps/email-preview/email-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './cmps/side-bar/side-bar.component';
// import { EmailDetailsComponent } from './cmps/email-details/email-details.component';
import { EmailDetailsComponent } from './pages/email-details/email-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    EmailAppComponent,
    EmailEditComponent,
    EmailListComponent,
    EmailPreviewComponent,
    SideBarComponent,
    EmailDetailsComponent,
    EmailDetailsComponent,
    // EmailPreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
