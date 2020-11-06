import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SERVER } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  constructor(
    public http: HttpClient,
  ) {}

  instantiate(array, classToUse):any{
    let returnArray = [];
    for(let i = 0; i < array.length; i++){
      returnArray.push(new classToUse(array[i]));
    }
    return returnArray;
  }

  async get(uri:string, params:any={}){
    let url = SERVER + uri;
    url = this.addparams(url, params);
    try {
      const res = await this.http.get(url, httpOptions).toPromise();
      return this.extractData(res,uri);
    } catch (err) {
      throw this.handleError(err, uri);
    }
  }

  async post(uri:string, params:any={},showMessage:boolean = true) {
    const url = SERVER + uri;
    try {
      const res = await this.http.post(url, params, httpOptions).toPromise();
      return this.extractData(res,uri);
    } catch (err) {
      throw this.handleError(err, uri);
    }
  }

  public addparams = function(url, params) {
    if (params) {
      const keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        url += '&' + encodeURI(keys[i]) + '=' + encodeURI(params[keys[i]]);
      }
    }
    return url;
  };

  public handleError(error: HttpErrorResponse, onRequest:string="") {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `
                Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}` +
        `onRequest: ${onRequest}`
      );
      if(!error.status){
        error.error.error = "Problème de connexion, vérifiez votre connexion internet.";
      }
    }
    return error.error;
  }

  public extractData(res, onRequest:string="") {
    console.log("rest api service extract data from : " + onRequest);
    console.log(res);
    const body = res;
    return body || {};
  }
}
