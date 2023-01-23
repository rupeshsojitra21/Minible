import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvoirmentService {

  constructor() { }

  // Dev URL
  public Url = 'https://ns1a4791t4.execute-api.ap-southeast-1.amazonaws.com/';
  public GeneralToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJ1aWQiOiI1MTQ4NzlmOS0zMTQ1LTRlMTMtOGIwMy01YzgwYWYyMCIsImlhdCI6MTY0NzE3MTEyOH0.y2VbgFgKcmVhHBxZYft2en6WaV-6IPZO_lt3hIP1x-Y';


  public loginMode = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  //for version of the application
  public versionId = 1.0;

  //for ag-grid Enterprise Key
  public agGridKey = '';
}
