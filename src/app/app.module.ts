import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        VgCoreModule,
        VgControlsModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
