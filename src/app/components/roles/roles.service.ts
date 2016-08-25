export interface IRole {
  id: number;
  name: string;
  description: string;

}

export class rolesService {
  
  /** @ngInject */
  constructor (private $log: angular.ILogService, private $http: angular.IHttpService) {
    
  }
   //for converting roles which comes from server as object to array for convenience 
  private convertToArray(myObj){
   return Object.keys(myObj).map(x => {
     myObj[x].id = x;
     return myObj[x];
    });
  } 
  private processPrivileges(role) {
    //need to store only selected ones
    role.privileges = role.privileges.filter(r=>r.isSelected===true);
    //need to convert privileges to array which contain only names
    role.privileges = role.privileges.map(p=>p.name);
  }
  //--service public methods 
  getRoles(): angular.IPromise<any[]>{
    return this.$http.get('/api/roles').then((response: any): any => {
       return this.convertToArray(response.data.roles);
    })
    .catch((error: any): any => {
      this.$log.error('XHR Failed for getContributors.\n', error.data);
    });
  }
  delRole(id): angular.IPromise<any[]>{
    return this.$http.delete('/api/roles/'+id+'/delete').then((response: any): any => {
        console.log('success')
    })
    .catch((error: any): any => {
        this.$log.error('XHR Failed to delete.\n', error.data);
    });
  }
  createRole(role): angular.IPromise<any[]>{
    this.processPrivileges(role);
    return this.$http.post('/api/roles/create',role).then((response: any): any => {
         console.log('success')
    })
    .catch((error: any): any => {
        this.$log.error('XHR Failed create role.\n', error.data);
    });
  }
  editRole(id, role): angular.IPromise<any[]>{
    this.processPrivileges(role);
    return this.$http.post('/api/roles/'+id+'/update',role).then((response: any): any => {
        console.log('success')
    }).catch((error: any): any => {
        this.$log.error('XHR Failed for getContributors.\n', error.data);
    });
  }
  getAvaliabePrivileges(): angular.IPromise<any[]>{
    return this.$http.get('/api/roles').then((response: any): any => {
       return response.data.privileges.map(p=>{ return {name:p}; });
    })
    .catch((error: any): any => {
      this.$log.error('XHR Failed for getContributors.\n', error.data);
    });
  }
  getRoleDetails(id): angular.IPromise<any[]>{
    return this.$http.get('/api/roles').then((response: any): any => {
       let selectedRole = response.data.roles[id];
       let avalibalePrivileges = response.data.privileges.map(p=>{ 
        return {
         isSelected :selectedRole.privileges.indexOf(p)>=0,
         name:p
        }; 
       });
       response.data.selectedRole = selectedRole;
       response.data.selectedRole.privileges = avalibalePrivileges;
       return  response.data.selectedRole;
    })
    .catch((error: any): any => {
      this.$log.error('XHR Failed for getContributors.\n', error.data);
    });
  } 
 //--END of public methods
}
