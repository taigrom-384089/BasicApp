import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule }   from '@angular/forms';

import { UserService } from './services/user.service';
import { UserEndpoint } from './services/endpoint/user-endpoint.service';
import { EndpointFactory } from './services/endpoint/endpoint-factory.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AlertService } from './services/alert.service';

import { AppComponent } from './components/app.component';
import { LoginComponent } from "./components/login/login.component";
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        AlertService,
        LocalStoreManager,
        UserService,
        UserEndpoint,
        EndpointFactory
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
