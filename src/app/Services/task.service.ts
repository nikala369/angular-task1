import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private https: HttpClient) {}

  // Create institutions
  createinst(userData: any) {
    return this.https.post<any>(`${baseUrl}/institutions/create`, userData);
  }

  // Create Branches
  // returning 422 error
  createBranch(branchData: any) {
    return this.https.post<any>(
      `${baseUrl}/institutions/1/branches/create`,
      branchData
    );
  }

  // Auth
  login(user: string) {
    return this.https.post<any>(`${baseUrl}/login`, user);
  }

  // For Guard <!! means returns true or false>
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
