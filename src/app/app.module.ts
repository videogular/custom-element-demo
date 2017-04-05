import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { TimeViewerComponent } from './time-viewer/time-viewer.component';

@NgModule({
    declarations: [
        AppComponent,
        TimeViewerComponent
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
