import { Injectable } from '@angular/core';
import { Product } from '../../product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../message/message.service';
import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { config } from '../../config/config'


@Injectable()
export class ProductService {
  products = new Array<Product>();

  private apiProductUrl = 'http://localhost:8080/api/product';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private messageService: MessageService
  ) { }

  // getProducts(): Observable<Product[]> {
  //   // send the message _after_ fetching the heroes
  //   this.log('ProductService: fetched products.');
  //   return of(PRODUCTS);
  // }

  /** GET heroes from the server */
  getProducts(): Observable<Product[]> {

    return this.tokenService.createToken()
      .pipe(
      switchMap(token => {
        console.log(token);
        let headers = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`)
        };
        const url = `${config.api_url}/products`;
        return this.http.get<Product[]>(`${config.api_url}/products`, headers)
          .pipe(
          tap(data => console.log(data))
          );
      })
      );

  }

  getProduct(id: number): Observable<Product> {
    console.log("getProduct");
    return this.tokenService.createToken()
      .pipe(
      switchMap((token) => {
        let headers = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`)
        };
        const url = `${config.api_url}/products/${id}`;
        return this.http.get<Product>(url, headers)
          .pipe(
          // tap(_ => this.log(`fetched product id=${id}`)),
          catchError(this.handleError<Product>(`getProduct id=${id}`))
          );
      }));
  }


  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    console.log("getProduct");
    return this.tokenService.createToken()
      .pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders()
                    .set('Authorization', `Bearer ${token.access_token}`)
                    .set('Content-Type', 'application/json')
        };
        const url = `${config.api_url}/products`;
        return this.http.post<Product>(url, product, httpOptions).pipe(
          tap((product: Product) => this.log(`added product w/ id=${product.id}`)),
          catchError(this.handleError<Product>('addProduct'))
        );
      }));
  }

  /** PUT: update the hero on the server */
  updateProduct(product: Product): Observable<Product> {
    console.log("updateProduct");
    return this.tokenService.createToken()
      .pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders()
                    .set('Authorization', `Bearer ${token.access_token}`)
                    .set('Content-Type', 'application/json')
        };
        const url = `${config.api_url}/products/${product.id}`;

        return this.http.put<Product>(url, product, httpOptions).pipe(
          tap(_ => this.log(`updated product id=${product.id}`)),
          catchError(this.handleError<Product>('updateProduct'))
        );
      }));

  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<any> {
    console.log("deleteProduct");
    return this.tokenService.createToken()
      .pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`)
        };
        const id = typeof product === 'number' ? product : product.id;
        const url = `${config.api_url}/products/${id}`;
        return this.http.delete(url, httpOptions)
          .pipe(
          tap(_ => this.log(`Deleted product id=${id}`)),
          catchError(this.handleError<any>(`getProduct id=${id}`))
          );
      }));


  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
