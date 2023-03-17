import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmtApiService {

  private CORS_PROXY = "https://cors-anywhere-andreu.onrender.com/";

  constructor() {

  }


  async loadIndex(){
    let path = `${this.CORS_PROXY}http://www.emtpalma.cat`;
    var rsp = await fetch(path);
    return rsp;
  }

  async refreshToken(nonce: string, userId: string){
    let path = "https://www.emtpalma.cat/ca/linies-horaris?p_p_id=es_emtpalma_web_front_AccesoApiPortlet_INSTANCE_datosApiEnPlantilla&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2Fapi%2Fgettoken&p_p_cacheability=cacheLevelPage&_es_emtpalma_web_front_AccesoApiPortlet_INSTANCE_datosApiEnPlantilla_nonce=crt5023omc4ks5gtmhghrnmad8&_es_emtpalma_web_front_AccesoApiPortlet_INSTANCE_datosApiEnPlantilla_userId=37AACB65253A0076D32624A175B73778BF6A8446";
  }


  async getParada(numParada: string, bearerToken: string){
    let path = `${this.CORS_PROXY}https://api.mobipalma.mobi/1.2/paradas/${numParada}`;
    var rsp = await fetch(path, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${bearerToken}`,
      },
    });
    return rsp;
  }

  async getParadas(bearerToken: string){
    let path = `${this.CORS_PROXY}https://api.mobipalma.mobi/1.2/paradas`;
    var rsp = await fetch(path, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${bearerToken}`,
      },
    });
    return rsp;
  }

}
