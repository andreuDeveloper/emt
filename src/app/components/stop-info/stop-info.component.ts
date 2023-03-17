import { StopInfo } from './../../dtos/StopInfoDTO';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmtService } from 'src/app/services/emt.service';

@Component({
  selector: 'app-stop-info',
  templateUrl: './stop-info.component.html',
  styleUrls: ['./stop-info.component.scss']
})
export class StopInfoComponent {

  @Input() info: StopInfo;

  constructor(private router: Router,
    private emtService: EmtService){}


    returnDateDiff(timestamp){

      return new Date(timestamp).toString().split("GMT")[0];

      let date = new Date(timestamp);
      let now = new Date();
      let diffTime = Math.abs(+now - +date);

      const diffMinutes = Math.ceil(diffTime / 1000 / 60);
      return diffMinutes;
    }

    secondsToString(seconds) {
      let str = "";
      let hour: any = Math.floor(seconds / 3600);
      if (hour > 0) str += hour + ` hora${hour > 1 ? "s" : ""} `;
      var minute: any = Math.floor((seconds / 60) % 60);
      if (minute > 0) str += minute + ` minuto${minute > 1 ? "s" : ""} `;
      var second: any = seconds % 60;
      if (second > 0) str += second + ` segundo${second > 1 ? "s" : ""}`;
      return str;
    }
}
