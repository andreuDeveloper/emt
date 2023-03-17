import { IterationInfoDTO } from './../../dtos/IterationInfoDTO';
import { StopInfo } from './../../dtos/StopInfoDTO';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmtService } from 'src/app/services/emt.service';
import { MobilePalmaTokenDTO } from 'src/app/dtos/MobilePalmaTokenDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stops-searcher',
  templateUrl: './stops-searcher.component.html',
  styleUrls: ['./stops-searcher.component.scss']
})
export class StopsSearcherComponent {

  public iterationInfo: IterationInfoDTO;

  public token: MobilePalmaTokenDTO;

  public stopNumber: string = "";
  public stopInfo: StopInfo;
  public isSearching: boolean = false;
  public stopSearchingRequested: boolean = false;

  constructor(private router: Router,
    private emtService: EmtService, private toastr: ToastrService){

      this.iterationInfo = {
        maxIterations: 50,
        actualIteraton: 0
      }

      this.toastr.toastrConfig.maxOpened = 1;

      this.emtService.obtainMobilePalmaToken().then((x) => {
        this.token = x;
      });

    }

  async waitStopCalls(){
    this.stopSearchingRequested = true;
    while (this.isSearching){
      await this.sleep(300);
    }
    this.stopSearchingRequested = false;
    return;
  }

  async getParadaInfo(num){

    await this.waitStopCalls();

    if (num){

      this.isSearching = true;

      this.iterationInfo.actualIteraton = 0;
      let ok = false;
      for (this.iterationInfo.actualIteraton = 0;
          this.iterationInfo.actualIteraton < this.iterationInfo.maxIterations && !ok;
          this.iterationInfo.actualIteraton++){
        let r = await this.emtService.getParadaInfo(num);
        if (r) {
          this.stopInfo = r;
          ok = true;
        }

        if (this.stopSearchingRequested){
          this.stopSearchingRequested = false;
          this.toastr.info("Paradas llamadas anteriores");
          break;
        }

        //await this.sleep(200);
      }

      if (!ok){
        this.toastr.error( "Número intentos: " + this.iterationInfo.maxIterations, "Servicio no operativo");
      }

    } else {
      this.toastr.clear();
       this.toastr.warning("Inserta una parada");
    }

    this.isSearching = false;
    console.log(this.stopInfo);
  }

  async getAllParadas(){
    await this.emtService.getAllParadas();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
