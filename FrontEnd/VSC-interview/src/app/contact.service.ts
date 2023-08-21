import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiurl = "https://localhost:7198";

  constructor(private http: HttpClient) { }

  getAll(pageNo: number, pageSize: number): Observable<Contact[]> {
    const idToken = localStorage.getItem("id_token");
    return this.http.get<Contact[]>(this.apiurl + "/getall", {
      params: new HttpParams()
        .set('pageSize', pageSize)
        .set('pageNo', pageNo),
      headers: new HttpHeaders().set("Authorization", "Bearer " + idToken!)
    });
  }

  updateContact(contact: Contact) {
    const idToken = localStorage.getItem("id_token");
    return this.http.post<any>(this.apiurl + "/updateContact", contact, { headers: new HttpHeaders().set("Authorization", "Bearer " + idToken!) })
  }

  deleteContact(id: number) {
    const idToken = localStorage.getItem("id_token");
    return this.http.delete(this.apiurl + "/deleteContact?id=" + id, { headers: new HttpHeaders().set("Authorization", "Bearer " + idToken!) });
  }

  addContact(contact: Contact) {
    const idToken = localStorage.getItem("id_token");
    return this.http.post<any>(this.apiurl + "/addContact", contact, { headers: new HttpHeaders().set("Authorization", "Bearer " + idToken!) })
  }

  getCount() {
    const idToken = localStorage.getItem("id_token");
    return this.http.get<number>(this.apiurl + "/getCount", { headers: new HttpHeaders().set("Authorization", "Bearer " + idToken!) })
  }
}
