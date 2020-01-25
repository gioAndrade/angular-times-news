import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsListService {
  _baseURL = environment.url;
  constructor(private httpClient: HttpClient) { }

  news(type): Observable<any> {
    return this.httpClient.get<any[]>(
      `${this._baseURL}/${type}.json?api-key=Gc1wFbDWaPBB1C3dFTmEU34ucMlNFWxE`
    );
  }

}
