'use strict';
let router = require('koa-router')();
let config = require('./config');
let uuid = require('node-uuid');
let posts = {
     "privileges": [
          "View Data",
          "View Users",
          "Manage Users",
          "View Roles",
          "Manage Roles",
          "Configure System",
          "View System Configuration",
          "Random Privilege #81"
     ],
     "roles": {
          "1": {
               "name": "Admin",
               "description": "All privileges",
               "privileges": [
                    "View Data",
                    "View Users",
                    "Manage Users",
                    "View Roles",
                    "Manage Roles",
                    "Configure System",
                    "View System Configuration",
                    "Random Privilege #81"
               ]
          },
          "2": {
               "name": "Viewer",
               "description": "View items",
               "privileges": [
                    "View Data",
                    "View Roles",
                    "View System Configuration",
                    "View Users"
               ]
          },
          "3": {
               "name": "Security manager",
               "description": "Manage security",
               "privileges": [
                    "Manage Roles",
                    "Manage Users",
                    "View Data"
               ]
          }
     }
}
function findPost(id) {
  return posts.roles.find((post) => {
    return post.id == id;
  });
}

router.get('/api/roles', function*() {
  this.body = posts;
});

router.delete('/api/roles/:id/delete', function*() {
    
     delete posts.roles[this.params.id]
     this.body = {success: true};
});

router.post('/api/roles/:id/update', function*() {
  let post = this.request.body;
  if(post.name==='Admin'){
        this.throw(404, 'You cannot edit Admin role');
  }else if(post.privileges.length==0) {

       this.throw(404, 'privileges cannot be empty');
  
  } else {
    posts.roles[this.params.id]=post;
    this.body = post;
  }
});


router.post('/api/roles/create', function*() {
  let newPost = this.request.body;
  if(newPost.privileges.length==0) {
     this.throw(404, 'privileges cannot be empty');
  }else {
    posts.roles[uuid.v4()] = newPost;
    this.body = {success: true};
  }     

});



module.exports = router;