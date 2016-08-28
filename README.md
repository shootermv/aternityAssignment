# Role Manager
Assignment for atrenity company
Includes basic angular app which can send crud requests to the server

### Functionality
  - See roles list
  - Create role  
  - Edit role and its privileges
  - Delete role

### Features
  - Form validations
  - Error & Sucess feedbacks
  - Animations

### Tech
  - Angular
  - Material Design
  - Typescript


### Compile To Es5 For Run With Tomcat
  - Open terminal on project root directory
  - Run 
```
gulp
``` 
  - After build finished copy files from "dist" directory
  - Place files to your tomcat webapps directory

### Running Dev Environment
  - Open terminal on project root directory
  - Run :
```
node server/index
``` 
  - Open another terminal window
  - Run :
  ```
gulp serve
``` 