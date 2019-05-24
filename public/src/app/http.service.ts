import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getKith(){
    console.log("get kith")
    return this._http.get('/get-kith');
  }
  getNike(){
    console.log("get nike")
    return this._http.get('/get-nike');
  }
  getTheHundreds(){
    console.log("get The Hundreds")
    return this._http.get('/get-the-hundreds');
  }
  getBape(){
    console.log("get Bape")
    return this._http.get('/get-bape');
  }
  getEnd(){
    console.log("get End")
    return this._http.get('/get-end');
  }
  getAdidas(){
    console.log("get Adidas")
    return this._http.get('/get-adidas');
  }
}
