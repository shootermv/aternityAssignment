import { rolesService, IRole } from '../components/roles/roles.service';

export class addController {
 public role:any;
 /* @ngInject */
 constructor(
   private rolesService:rolesService,
   private $state      : ng.ui.IStateProvider,
   private toastr      : any,
   private $timeout    : angular.ITimeoutService
   ) {
    this.activate();
 }
 activate() {
    this.role = {name:'',description:''} ;
    this.rolesService.getAvaliabePrivileges()
    .then((data: any) => {
        this.role.privileges = data;
    });
 }

 addRole(frm) {
   if(!frm.$valid){return;}
   this.rolesService.createRole(this.role).then((data: any) => {  
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