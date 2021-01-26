import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '..';
import { map, catchError } from 'rxjs/operators';
import { IPageRequest } from '../global';
import { requestQuery } from '../../utils';

@Injectable()
export class FoodService {
  constructor(
    private http: HttpClient
  ) { }
  public getAll(id, request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.FOOD.GET(id)}?${(requestQuery(request))}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
