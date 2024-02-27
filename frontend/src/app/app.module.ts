import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { leitnerBoxReducer } from './state/leitner-box/leitner-box.reducer';
import { LeitnerBoxEffects } from './state/leitner-box/leitner-box.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ cards: leitnerBoxReducer }),
    EffectsModule.forRoot([LeitnerBoxEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
