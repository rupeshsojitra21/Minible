import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SimplebarAngularModule } from 'simplebar-angular';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { UiSwitchModule } from 'ngx-ui-switch';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ModalModule } from './modal/modal.module';
import { ModalService } from './modal/modal.service';
// import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';

const module = [
  // ContextMenuModule,
  CommonModule,
  TranslateModule,
  RouterModule,
  NgbDropdownModule,
  ClickOutsideModule,
  SimplebarAngularModule,
  UiSwitchModule,
  ModalModule
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent, RightsidebarComponent, HorizontalComponent, VerticalComponent, HorizontaltopbarComponent, ContextMenuComponent],
  imports: [
    ...module
  ],
  providers: [ModalService]
})
export class LayoutsModule { }
