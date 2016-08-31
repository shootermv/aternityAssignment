import { WebDevTecService, ITecThing } from '../components/webDevTec/webDevTec.service';
import { rolesService } from '../components/roles/roles.service';
import {  IRole, Role } from '../models/role';
export class MainController {
  public toastr: any;
  public roles:IRole[];
  
  /* @ngInject */
  constructor (
    $timeout            : angular.ITimeoutService, 
    webDevTec           : WebDevTecService,
    toastr              : any, 
    private $http       : ng.IHttpService,
    public $mdDialog    : ng.material.IDialogService, 
    private rolesService:rolesService,
    private $state      : ng.ui.IStateProvider
    ) {


    this.toastr = toastr;
    this.activate();
  }


 addRoleModal() {
   this.$state.go('add');
 }
 editRoleModal(role) {
   this.$state.go('edit',{id: role.id});
 }
 deleteRoleModal(role, ev) {
    var confirm = this.$mdDialog.confirm()
          .title('Would you like to delete this role?')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');
    this.$mdDialog.show(confirm).then(() => { 
      this.rolesService.delRole(role.id)
      .then((data: any) => {
         this.roles.splice(this.roles.indexOf(role),1); //delete the role from the list
         this.showToastr('deleted', 'success');
      });
    });
 }

  /** @ngInject */
  activate() {

    this.rolesService.getRoles()
    .then((data:IRole[]) => {
        this.roles = data;
    });

  }
  
 showToastr(txt, action) {
    this.toastr[action](txt);
 }

}
