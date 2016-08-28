import { rolesService } from '../components/roles/roles.service';
import {  IRole, Role } from '../models/role';

export class addController {
 public role:any;
 public selectedItem:any = null;
 public searchText:any = null;


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
    this.role = new Role('','', []);
 }

 cancel():void {
   this.$state.go('home');
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
 querySearch (query) {
     return this.rolesService.getAllPrivileges();
 }

}