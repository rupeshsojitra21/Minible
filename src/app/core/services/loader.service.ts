import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);
  constructor(private ngxService: NgxUiLoaderService) { }

  public startLoader(loaderId: string) {
    this.ngxService.startLoader(loaderId);
  }

  public stopLoader(loaderId: string) {
    this.ngxService.stopLoader(loaderId);
  }

  public startBackgroundLoader(loaderId: string) {
    this.ngxService.startBackgroundLoader(loaderId);
  }

  public stopBackgroundLoader(loaderId: string) {
    this.ngxService.stopBackgroundLoader(loaderId);
  }

  public startBackground() {
    this.ngxService.startBackground();
  }

  public stopBackground() {
    this.ngxService.stopBackground();
  }

  public start() {
    this.ngxService.start();
  }

  public stop() {
    this.ngxService.stop();
  }

  public loaderWithTime(delay: number) {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, delay);
  }

}
