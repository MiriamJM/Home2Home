import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Home2HomeApiService {

  constructor(private http: Http) { }


  getPropertiesIndex() {
    return this.http.get('http://localhost:8080/app/properties')
    .map(response => response.json());
  }

  getProperties(index: string) {
    return this.http.get('http://localhost:8080/app/properties/' + index)
    .map(response => response.json());
}

  getUserInfoIndex() {
    return this.http.get('http://localhost:8080/app/users')
      .map(response => response.json());
  }

  getUserInfo(index: string) {
    return this.http.get('http://localhost:8080/app/users/' + index)
    .map(response => response.json());
  }

  getBookingInfo(index: string) {
     return this.http.get('http://localhost:8080/app/bookings/' + index)
     .map(response => response.json());
  }

  getBookingsIndex() {
    return this.http.get('http://localhost:8080/app/bookings/')
    .map(response => response.json());
  }

  getPropertySearchResults(location: string, guests: string) {
    return this.http.get('http://localhost:8080/app/searchForHomes/' + location + "-" + guests)
    .map(response => response.json());
  }

  getReviews(index: string) {
    return this.http.get('http://localhost:8080/app/reviewsByProperty/' + index)
    .map(response => response.json());
  }

}
