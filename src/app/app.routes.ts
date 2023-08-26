import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { InventoryComponent } from "./components/inventory/inventory.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'inventory',
        component: InventoryComponent
    }
]