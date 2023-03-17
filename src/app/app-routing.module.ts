import { StopsSearcherComponent } from './components/stops-searcher/stops-searcher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'stops', component: StopsSearcherComponent },
  { path: '', redirectTo: '/', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
