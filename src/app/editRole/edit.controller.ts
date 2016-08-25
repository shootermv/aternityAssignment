import { rolesService, IRole } from '../components/roles/roles.service';

export class editController {
 public role:any;

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
    .then((data: any) => {
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


 showToastr(txt, action) {
    this.toastr[action](txt);
 }

}