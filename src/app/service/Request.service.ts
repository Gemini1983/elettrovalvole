import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Task, Valve, Cron } from '../model/models';
import { PlatformLocation } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class RequestService {
    private urlBase: string;

    private httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'})
  };

    constructor(private httpClient: HttpClient, platformLocation: PlatformLocation) {

      if (environment.production) {

        this.urlBase = (platformLocation as any).location.origin+'/api';
        console.log(this.urlBase);

        if (!this.urlBase) {
          this.urlBase = window.location.protocol + '//' +
            window.location.hostname +
            (window.location.port ? ':' + window.location.port : '');
          console.log('URL base: ' + this.urlBase);
        }
      } else {
        this.urlBase = environment.urlBase;
      }
    }

    public get_valves(): Observable<any> {
       return this.httpClient.get<Object>(this.urlBase + '/valves/', this.httpOptions);
    }
    public get_valve(idValve): Observable<any> {
      return this.httpClient.get<Object>(this.urlBase + '/valves/'+idValve, this.httpOptions);
   }



/*

    public delete_dossier(dossier: Dossier): Observable<Object> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.get_token()
            })
        };
        return this.httpClient.delete(this.urlBase + '/api/dossiers/' + dossier.id, httpOptions).pipe();
    }


    public get_document(idDossier, idDocument): Observable<any> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.get_token()
            })
        };
        return this.httpClient.get<Object>(this.urlBase + '/api/dossiers/' + idDossier + '/documents/' + idDocument + '/content' + '?time=' + new Date().getTime(), httpOptions);
    }


    public post_otp(): Observable<any> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.get_token()
            })
        };
        return this.httpClient.post<Object>(this.urlBase + '/api/otp', null, httpOptions);
    }

    public post_remotesign(idDossier: String, pin: String, otp: String, idTransaction: String): Observable<any> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.get_token()
            })
        };
        let body = {
            idDossier: idDossier,
            pin: pin,
            otp: otp,
            idTransaction: idTransaction
        }
        return this.httpClient.post<Object>(this.urlBase + '/api/remotesign', body, httpOptions);
    }

*/

}
