export class ApiConstants {
    public static apiEndPoints = {
        auth: {
            login: 'StaffLoginLambdaFunction'
        },
        user: {
            create: 'webadminstaffCreate',
            list: 'webadminStaffList',
            detail: 'webadminStaffDetail',
            update: 'webadminStaffUpdateDetail',
            delete: 'webadminStaffDelete',
            userGroups: 'webadminAssignGroupList',


        },
        group: {
            create: 'webadminStaffGroupCreate',
            list: 'webadminStaffGroupList',
            detail: 'webadminStaffGroupDetail',
            update: 'webadminStaffGroupUpdateDetail',
            delete: 'webadminStaffGroupDelete',
            assignGroup: 'webadminAssignGroup'

        }
    };
}