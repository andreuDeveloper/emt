import { StopInfo } from './../dtos/StopInfoDTO';
import { MobilePalmaTokenDTO } from './../dtos/MobilePalmaTokenDTO';
import { EmtApiService } from './../clients/emtApi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmtService {
  private token: MobilePalmaTokenDTO;

  constructor(private api: EmtApiService) {
    this.obtainMobilePalmaToken().then((x) => (this.token = x));

    setInterval(() => {
      this.obtainMobilePalmaToken().then((x) => (this.token = x));
    }, 1000 * 60 * 3); //3 min refresco
  }

  async obtainMobilePalmaToken() {
    let jsKey = 'window.mobipalmaToken=';
    let r = await this.api.loadIndex();
    if (r.ok) {
      let html = await r.text();
      let split = html.split(jsKey)[1];
      split = split.split('}')[0];
      split += '}';

      split = split.replace('token', `"token"`);
      split = split.replace('nonce', `"nonce"`);
      split = split.replace('userId', `"userId"`);

      console.log(split);

      let token: MobilePalmaTokenDTO = JSON.parse(split);

      this.token = token;

      return this.token;
    }
    return null;
  }

  getActualToken(){
    return this.token;
  }


  async getParadaInfo(stopNumber: string){
    let info: StopInfo;
    var r = await this.api.getParada(stopNumber, this.token.token);
    console.log(r);
    if (r.ok){
      info = await r.json();
    }
    return info;
  }

  async getAllParadas() {
    var r = await this.api.getParadas(this.token.token);
  }
}
