import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
// const shajs = require('sha.js');
import * as shajs from 'sha.js';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../../core/services/language.service';
import { dropList, language } from 'src/app/core/models/apiService.model';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  errorMessage = "";
  defaultSelectedlanguage!: string;
  languageData: language = {};
  dropListData = {
    data: []
  };
  phoneCodeData = {
    data: []
  };
  selected: any;

  // set the currenr year
  year: number = new Date().getFullYear();
  tabName: string = 'tab1';

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService, private ref: ChangeDetectorRef, private httpClient: HttpClient, private languageService: LanguageService,
    private loaderService: LoaderService) { }

  selectedValue(name: string) {
    this.tabName = name;
  }
  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');

    this.loginForm = this.formBuilder.group({
      // email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      // password: ['123456', [Validators.required]],
      countryCode: ['66'],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      // loginBy: ['Email'],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem('activeLanguage', 'EN')
    this.defaultSelectedlanguage = 'English'
    // let data = JSON.parse(localStorage.getItem('currentToken')!) as User;
    // this.LoginUserName = data.user_firstname + ' ' + data.user_lastname;
    this.getLanguage();
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit(defaultLogin: boolean) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let Pass = this.loginForm.value.password
    if (!defaultLogin) {
      const digest = shajs('sha256').update(Pass).digest('hex')
      this.loginForm.value.password = digest;
    }

    this.loaderService.start();
    this.authenticationService.login(this.loginForm.value).subscribe(
      response => {
        if (response['yohStatus'] == 2000) {
          this.router.navigate(['/dashboard']);
          this.getPermission();
          this.getLanguage();
          // setTimeout(() => {
          // }, 5000);
        }
        else {
          // this.errorMessage = "Please enter Valid Username and Password.";
          this.errorMessage = this.languageData['4001'];
        }
        this.ref.markForCheck();
        this.loaderService.stop();
      },
      error => {
        this.error = error ? error : '';
      }
    );

    // else {
    //   // if (environment.defaultauth === 'firebase') {
    //   //   this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //   //     document.body.removeAttribute('class');
    //   //     this.router.navigate(['/dashboard']);
    //   //   })
    //   //     .catch(error => {
    //   //       this.error = error ? error : '';
    //   //     });
    //   // } else {
    //   this.authFackservice.login(this.f.email.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //         this.router.navigate(['/dashboard']);
    //       },
    //       error => {
    //         this.error = error ? error : '';
    //       });
    // }
    // }

  }

  getPermission() {
    let id = JSON.parse(localStorage.getItem('currentToken')!);
    this.httpClient
      .get(
        'https://asset.yoyoyoh.com/permission_jsontext/' + id.permission_id + '.json',
        // 'https://asset.yoyoyoh.com/permission_jsontext/0af5b89d3c25beca0d11319ecde8ce15.json',
        { responseType: 'text' }
      )
      .subscribe((x) => {
        localStorage.setItem('permission', x);
      });
  }
  getLanguage() {
    // this.loaderService.start();
    this.httpClient.get('https://version.yoyoyoh.com/version.yaml', { responseType: 'text' })
      .subscribe((x) => {
        // let data = JSON.parse(x).versions[0].filename;
        // if (localStorage.getItem('language')) {
        //   if (!localStorage.getItem('languageVersion')) {
        //     localStorage.setItem('languageVersion', data);
        //   }
        // }
        localStorage.setItem('languagesUrl', x);
        this.tempLanguage('EN');
        this.getDropList();
        // this.loaderService.stop();
      });
  }

  switchLanguage(event) {
    var languageName = event.target.value;
    localStorage.removeItem('activeLanguage');
    localStorage.setItem('activeLanguage', languageName);
    this.defaultSelectedlanguage = languageName == 'EN' ? 'English' : 'Thai';
    this.tempLanguage(languageName);
  }

  tempLanguage(languageCode: string) {
    let data: any = JSON.parse(localStorage.getItem('languagesUrl')!);
    let url = (data['web_versions'][0]['url'])
    let filename = (data['web_versions'][0]['filename']);
    filename = filename.find((o: { filename: string, filetype: string, language: string }) => o.language == languageCode && o.filetype == 'label').filename;

    this.loaderService.start();
    this.httpClient.get(url + '/' + filename, { responseType: 'text' })
      .subscribe((x) => {

        localStorage.removeItem('language');
        localStorage.setItem('language', this.transformToLanguage(x));
        this.languageService.setLanguageYoh(JSON.parse(this.transformToLanguage(x)));
        this.loaderService.stop();
      });
  }
  transformToLanguage(data: any): any {
    let languageData = JSON.parse(data)['Records'];
    for (var d of languageData) {
      let key = Object.keys(d)[0];
      let value = Object.values<string>(d)[0];
      this.languageData[key] = value;
    }
    return JSON.stringify(this.languageData);
  }

  getDropList() {
    let data: any = JSON.parse(localStorage.getItem('languagesUrl')!);
    let url = (data['web_versions'][0]['url'])
    let filename = (data['web_versions'][0]['filename']);
    filename = filename.find((o: { filename: string, filetype: string, language: string }) => o.language == 'EN' && o.filetype == 'droplist').filename;

    // this.loaderService.start();
    this.httpClient.get(url + '/' + filename, { responseType: 'text' })
      .subscribe((x) => {

        localStorage.removeItem('dropList');
        localStorage.setItem('dropList', this.transformToDropList(x));
        localStorage.setItem('phoneCode', this.transformToPhoneCode(x));
        this.languageService.setLanguageYoh(JSON.parse(this.transformToDropList(x)));
        // this.loaderService.stop();
      });
  }

  transformToDropList(data: any): any {
    this.dropListData.data = JSON.parse(data)['language_group']['language'];
    // for (var d of dropListData) {
    //   let key = Object.keys(d)[0];
    //   let value = Object.values<string>(d)[0];
    //   this.dropListData[key] = value;
    // }
    return JSON.stringify(this.dropListData);
  }

  transformToPhoneCode(data: any): any {
    this.phoneCodeData.data = JSON.parse(data)['RegisterAllowCountry_group']['RegisterAllowCountry'];
    return JSON.stringify(this.phoneCodeData);
  }

}
