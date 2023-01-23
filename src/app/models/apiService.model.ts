export interface staff {
    staff_phone_number: string,
    staff_password: string,
    first_name: string,
    last_name: string,
    staff_email: string,
    staff_gender: string,
    title: string,
    company_name: string,
    house_number: string,
    street_name: string,
    street_number: string,
    room_number: string,
    city: string,
    district: string,
    province: string,
    post_code: string,
    country_code: string,
    gps_longitude: string,
    gps_lattude: string,
}
export interface staffGroup {
    group_id: string,
    group_name: string,
}
export class assignGroup {
    profile_uid!: string
    group_id!: any
}
export interface language_obj {
    text: string
}
export interface language {
    [key: string]: string;
}
export interface Permission {
    [key: string]: PermissionDetails;
}
export interface PermissionDetails {
    isView: boolean;
    isEdit: boolean;
}
export class updateLanguage {
    key!: string;
    text!: string;
}
export class updateLanguageServer {
    language_code!: string;
    menu_code!: string;
    lbl_name!: string;
    lbl_value!: string;
    staff_uid!: string;
}
export class getPermissionServerList {
    No!: string;
    sec_id!: string;
    sec_type!: string;
    name!: string;
    allow_view!: string;
    allow_edit!: string;
}
export class savePermissionServer {
    object_name!: string;
    sec_id!: string;
    type!: string;
    allow_view!: string;
    allow_edit!: string;
    staff_uid!: string;
}
export class getWebAdminPermission {
    object_name!: string
}