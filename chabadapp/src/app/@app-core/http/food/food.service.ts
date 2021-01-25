import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '..';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FoodService {
  constructor(
    private http: HttpClient
  ) { }
  
  public getFoodById(id) {
    return this.http.get<any>(`${APICONFIG.FOOD.GETFOOD(id)}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorRes => {
        throw errorRes.error;
      })
    );
  }
}
