import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvoirmentService } from './envoirment.service';
import { ApiConstants } from 'src/app/core/services/constants';
import { getWebAdminPermission, savePermissionServer, staff, updateLanguageServer } from 'src/app/models/apiService.model';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  message!: string;
  header: any;
  token!: string;
  headers!: HttpHeaders;

  constructor(
    private http: HttpClient,
    private router: Router,
    private envService: EnvoirmentService,
    // private authService: AuthService
  ) { }

  public getUserStaffList() {
    let url = this.envService.Url + ApiConstants.apiEndPoints.user.list;
    return this.http.get(url);
  }
  // public deleteStaffUser(model: DeleteUser) {
  //   let url = this.envService.Url + ApiConstants.apiEndPoints.user.delete;
  //   return this.http.post(url, model);
  // }
  public createStaffUser(model: staff) {
    let url = this.envService.Url + ApiConstants.apiEndPoints.user.create;
    return this.http.post(url, model);
  }
  public updateStaffUser(model: staff) {
    let url = this.envService.Url + ApiConstants.apiEndPoints.user.update;
    return this.http.post(url, model);
  }
  public getGroupStaffList() {
    let url = this.envService.Url + ApiConstants.apiEndPoints.group.list;
    return this.http.get(url);
  }
  // public deleteStaffGroup(model: DeleteGroup) {
  //   let url = this.envService.Url + ApiConstants.apiEndPoints.group.delete;
  //   return this.http.post(url, model);
  // }
  public createStaffGroup(model: any) {
    let url = this.envService.Url + ApiConstants.apiEndPoints.group.create;
    return this.http.post(url, model);
  }
  public updateStaffGroup(model: any) {
    let url = this.envService.Url + ApiConstants.apiEndPoints.group.update;
    return this.http.post(url, model);
  }
  public updateLanguageServer(model: updateLanguageServer) {
    //let url = this.envService.Url + ApiConstants.apiEndPoints.group.update;
    let url = 'https://xz60epwn52.execute-api.ap-southeast-1.amazonaws.com/web_admin_label';
    return this.http.post(url, model);
  }
  public publishLanguageVersion() {
    let url = 'https://t6qohsnx0k.execute-api.ap-southeast-1.amazonaws.com/GetVersionData';
    return this.http.get(url);
  }
  public publishPermisssionVersion() {
    let url = 'https://a6cna51b5k.execute-api.ap-southeast-1.amazonaws.com/list_permission_user';
    return this.http.post(url, {});
  }
  public getWebAdminPermission(model: getWebAdminPermission) {
    let url = 'https://6o3xx93t8j.execute-api.ap-southeast-1.amazonaws.com/get_web_admin_permission';
    return this.http.post(url, model);
  }
  public saveWebAdminPermission(model: savePermissionServer) {
    let url = 'https://uym3jyej25.execute-api.ap-southeast-1.amazonaws.com/web_admin_permission';
    return this.http.post(url, model);
  }
}
