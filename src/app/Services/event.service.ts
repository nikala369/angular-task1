import { EventsServ, BranchServ, PersonalServ } from './../events';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private https: HttpClient) {}

  getInstitutionsAll(): Observable<any> {
    return this.https.get<any>(`${baseUrl}/institutions`);
  }

  getOneInst() {
    return this.https.get<any>(`${baseUrl}/institutions/1`);
  }

  searchInstitutions(searchData: any): Observable<any> {
    let page = 1;
    return this.https.get<any>(
      `${baseUrl}/institutions?page=${page}&name=${searchData.name}&pid=${searchData.identification}`,
      searchData
    );
  }

  getBranches(): Observable<any> {
    return this.https.get<any>(`${baseUrl}/institutions/1/branches`);
  }

  getInstitutionBranch(institutionId: any, branchId: any): Observable<any> {
    return this.https.get<any>(
      `${baseUrl}/institutions/${institutionId}/branches/${branchId}`
    );
  }

  getPersonal(): Observable<PersonalServ[]> {
    return (
      this.https
        //                                             data.id
        .get<PersonalServ[]>(`${baseUrl}/institutions/2/branches/2/personal`)
        .pipe(
          map((data: PersonalServ[]) => {
            return data;
          }),
          catchError((error) => {
            return throwError('Something went wrong!');
          })
        )
    );
  }
}
