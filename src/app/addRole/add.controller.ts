import { rolesService, IRole } from '../components/roles/roles.service';

export class addController {
 public role:any;
 /* @ngInject */
 constructor(private rolesService:rolesService, private $state: ng.ui.IStateProvider) {
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
      this.$state.go('home');
   });
 }
}