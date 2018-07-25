import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        catchError((error: Response) => {
          return throwError(new AppError(error.json()));
        })
      );
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
    .pipe(
      catchError((error: Response) => {
        if (error.status === 400)
          return throwError(new BadInputError(error.json()));
          
        return throwError(new AppError(error.json()));
      })
    );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id);
  }
}
