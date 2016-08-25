import { rolesService, IRole } from '../components/roles/roles.service';

export class editController {
 public role:any;
 /* @ngInject */
 constructor(private rolesService:rolesService, private $state: ng.ui.IStateProvider) {
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
     this.$state.go('home');
   });
 }
}