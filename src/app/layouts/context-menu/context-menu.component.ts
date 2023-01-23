import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/core/services/apiservice.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { getPermissionServerList, language, savePermissionServer, updateLanguage, updateLanguageServer, getWebAdminPermission } from 'src/app/models/apiService.model';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() key = ''
  @Input() Permissionkey = ''
  @Input() text = 'Edit Able'

  languageData = JSON.parse(localStorage.getItem('language')!) as language;
  passive: boolean = true;
  editlanguage: any;
  permissionData: any;
  apiResponse: any;
  updateLanguageServer!: updateLanguageServer;
  languageSelected!: string;
  savePermissionServer!: savePermissionServer;
  permissionArray!: savePermissionServer[];
  adminPermissions = {
    label: false,
    permission: false
  }

  constructor(private languageService: LanguageService, private modalService: ModalService, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.editlanguage = new updateLanguage();
    this.subscribeToLanguage();
    this.getContextMenuPermission();
  }
  subscribeToLanguage() {
    this.languageService.$language.subscribe((language: language) => {
      this.languageData = language;
      this.setLanguageText();
    });
  }
  setLanguageText() {
    if (this.languageData[this.key]) {
      this.text = this.languageData[this.key]
    }
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  Permission(text: string) {
    this.getWebAdminPermission(this.Permissionkey);
    this.openModal('permission' + this.key);
  }
  Language(key: string) {
    this.languageSelected = localStorage.getItem('activeLanguage')!;
    this.editlanguage = new updateLanguage();
    this.editlanguage.key = key;
    if (this.languageData[key])
      this.editlanguage.text = this.languageData[key];
    else
      this.editlanguage.text = ''
    this.openModal('language' + this.key);
  }

  savePermission() {
    this.permissionArray = [];
    for (var d of this.permissionData) {
      this.permissionArray.push({
        object_name: this.Permissionkey,
        sec_id: d.sec_id.toString(),
        type: d.sec_type.toString(),
        allow_edit: d.allow_edit == true ? '1' : '0',
        allow_view: d.allow_view == true ? '1' : '0',
        staff_uid: "1c4a3b87-bb65-4e70-b08c-0fbfa06a"
      })
    }
    this.saveWebAdminPermission(this.permissionArray);
    this.closeModal('permission' + this.key);
  }
  saveLanguage() {
    let languageData = new updateLanguageServer();
    languageData.language_code = localStorage.getItem('activeLanguage')!;
    languageData.menu_code = 'EN';
    languageData.lbl_name = this.editlanguage.key;
    languageData.lbl_value = this.editlanguage.text;
    languageData.staff_uid = '31c5e3c4-c8a9-40ec-a090-029a2bd4';
    this.apiService.updateLanguageServer(languageData).subscribe(
      success => {
        this.closeModal('language' + this.key);
      }
    )
  }
  getWebAdminPermission(key: string) {
    this.permissionData = '';
    let data = new getWebAdminPermission;
    data.object_name = key;
    this.apiService.getWebAdminPermission(data).subscribe((response) => {
      this.apiResponse = response;
      this.permissionData = this.apiResponse as getPermissionServerList;
    });
  }
  saveWebAdminPermission(data: any) {
    debugger
    this.apiService.saveWebAdminPermission(data).subscribe((response) => {
      this.apiResponse = response;
    });
  }

  getContextMenuPermission() {
    const data = JSON.parse(localStorage.getItem('currentToken')!);
    if (!data) {
      return
    }
    if (data.su_admin == 1) {
      this.adminPermissions.label = true;
      this.adminPermissions.permission = true;

    }

    if (data.label_admin == 1) {
      this.adminPermissions.label = true;
    }

    if (data.permission_admin == 1) {
      this.adminPermissions.permission = true;
    }
  }

}
