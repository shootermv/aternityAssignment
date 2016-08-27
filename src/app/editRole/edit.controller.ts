import { rolesService, IRole, Role } from '../components/roles/roles.service';

export class editController {
 public role:any;
 public selectedItem:any = null;
 public searchText:any = null;
 public selectedPrivileges = <any>[];


 /* @ngInject */
 constructor(
   private rolesService: rolesService,
   private $state      : ng.ui.IStateProvider,
   private toastr      : any,
   private $timeout    : angular.ITimeoutService
   ) {
    this.activate();
 }
 activate() {
    this.rolesService.getRoleDetails(this.$state.params.id)
    .then((data: Role) => {
        this.role = data;
    });
 }

 updateRole(frm) {
   if(!frm.$valid){return;}
   this.rolesService.editRole(this.$state.params.id, this.role).then((data: any) => {  
     this.$timeout(() => {
        this.$state.go('home');
     }, 3000);
     this.showToastr(data, 'success');
   }).catch((error: any) => {
     this.showToastr(error, 'error');
   });
 }


 querySearch (query) {
     return this.rolesService.getAllPrivileges();
 }

 showToastr(txt, action) {
    this.toastr[action](txt);
 }

}