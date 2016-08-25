import { WebDevTecService, ITecThing } from '../components/webDevTec/webDevTec.service';
import { rolesService, IRole } from '../components/roles/roles.service';

export class MainController {
  public awesomeThings: ITecThing[];
  public webDevTec: WebDevTecService;
  public classAnimation: string;
  public creationDate: number;
  public toastr: any;
  public roles:Array<Object>;
  
  /* @ngInject */
  constructor (
    $timeout        : angular.ITimeoutService, 
    webDevTec       : WebDevTecService,
    toastr          : any, 
    private $http   : ng.IHttpService,
    public $mdDialog: ng.material.IDialogService, 
    private rolesService:rolesService,
    private $state: ng.ui.IStateProvider
    ) {

    this.awesomeThings = new Array();
    this.webDevTec = webDevTec;
    this.classAnimation = '';
    this.creationDate = 1472104914685;
    this.toastr = toastr;
    this.activate($timeout);
  }






 deselectOthers(role) {
   // must deselect all other roles so only one role can be selected at time
  this.roles.forEach(rol=>{  
    if(rol.id!=role.id){
      rol.isSelected=false;
    }   
  });
 }


findSelected() {
  if(!this.roles || !this.roles.length){
    return false;
  }
  let found = this.roles.find(x=>{return x.isSelected===true;});
  return found;
}


 addRoleModal() {
   this.$state.go('add');
 }
 editRoleModal() {
   let found = this.findSelected();

   if(!found){return;} // <--if no roles selected there is nothing to edit
   this.$state.go('edit',{id: found.id});
 }
 deleteRoleModal(ev) {
   let found = this.findSelected();

   if(!found){return;} // <--if no roles selected there is nothing to delete
    var confirm = this.$mdDialog.confirm()
          .title('Would you like to delete this role?')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');
    this.$mdDialog.show(confirm).then(() => { 
      this.rolesService.delRole(found.id)
      .then((data: any) => {
         this.roles.splice(this.roles.indexOf(found),1);
         this.showToastr();
      });
    }, function() {

    });
 }

  /** @ngInject */
  activate($timeout: angular.ITimeoutService) {
    this.getWebDevTec();

    this.rolesService.getRoles()
    .then((data: any) => {
        this.roles = data;
    });

    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 1000);

    
    let newrole = {name:'Super Admin', description:'super administrator', privileges:[
"View Data"]};

    //this.delRole(12);
    
  }
  
  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

  getWebDevTec() {
    this.awesomeThings = this.webDevTec.tec;
  }
}
