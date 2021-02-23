import { Injectable, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../core/loading-spinner/shared.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        FormsModule,
        RouterModule.forChild([
            {
                path:'',component:LoginComponent,
            }
        ]),
        SharedModule
    ]
})
export class AuthModule{
    
}