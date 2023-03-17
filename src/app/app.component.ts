import { EmtService } from './services/emt.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'EMT - byAndreu';

  constructor(
    private router: Router,
    private emtService: EmtService) {

      this.router.navigate(['/', 'stops']);

   }

}


