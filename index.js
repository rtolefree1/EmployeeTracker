// this prograrm requires inquirer, index.js for DB queries, logo for output of queries
const { prompt } = require('inquirer');
const db = require('./db/index');
const logo = require("asciiart-logo");



// Importing express and creating variable
const express = require('express');

// Importing mysql and creating variable
const mysql = require('mysql2');


//const PORT = process.env.PORT || 3001; - dont think this is needed.
const app = express();

// function to display log and start program
function init(){
    const logoText = logo({name:"Employee Manager"}).render();
    console.log(logoText);

    loadMainPrompts();
}

// starting program
init();


 /*****************************/
/** BEGINNING: CITING SAURAV NOTES loadMainPrompts section only*/
/*****************************/

// creating prompts for user
function loadMainPrompts() {
    prompt({
        type: "list",
        name: "listChoice",
        message: "Please choose action from list",
        choices: [
            {
                name: "View all Employees",
                value: "VIEW_ALL_EMPLOYEES"
                
            },
            {
                name:"View All Employees by Department",
                value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            },
            {
                name: "View all Employees By Manager",
                value: "VIEW_ALL_EMPLOYEES_BY_MANAGER"
            },
            {
                name: "View all Roles",
                value: "VIEW_ROLES"
            },
            {
                name: "View all Departments",
                value: "VIEW_ALL_DEPARTMENTS"
            },
            {
                name: "View Employee Table",
                value: "VIEW_EMPLOYEE_TABLE"
            },
            {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Add Role",
                value: "ADD_ROLE"
            },
            {
                name: "Add Employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "Update Employee",
                value: "UPDATE_EMPLOYEE"
            },
            {
                name: "DONE",
                value: "DONE"
            }
            
        ]
     /*****************************/
    /** END: CITING SAURAV NOTES loadMainPrompts section only*/
    /*****************************/
    }).then((res) => {
        // using the response above to choose a case value
        let choice = res.listChoice;
        switch (choice){
            case "VIEW_ALL_EMPLOYEES":
                VIEW_ALL_EMPLOYEES();
                console.log('connection created, View Employees')
                break;
            case "VIEW_ROLES":
                VIEW_ROLES();
                break;
                //console.log('connection created, View Roles')
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                VIEW_EMPLOYEE_DEPARTMENTS();
                break;
            case "VIEW_ALL_DEPARTMENTS":
                VIEW_ALL_DEPARTMENTS();
                break;
            case "VIEW_ALL_EMPLOYEES_BY_MANAGER":
                VIEW_ALL_EMPLOYEES_BY_MANAGER();
                break;
            case "VIEW_EMPLOYEE_TABLE":
                VIEW_EMPLOYEE_TABLE();
                break;
            case "ADD_DEPARTMENT":
                ADD_DEPARTMENT();
                break;
            case "ADD_ROLE":
                ADD_ROLE();
                break;
            case "ADD_EMPLOYEE":
                ADD_EMPLOYEE();
                break;
            case "UPDATE_EMPLOYEE":
                UPDATE_EMPLOYEE();
                break;
            case "DONE":
                process.exit();
                break;
       }
    })
}



// function to query for all employees
function VIEW_ALL_EMPLOYEES(){
    db.returnAllEmployeeTitleSalaryInfo()
    .then(([rows]) =>{
        let employees = rows;
        console.table(employees);
    })
    .then(()=> loadMainPrompts()
    );
   
}

// function to query for all roles
function VIEW_ROLES()
{
    db.returnAllRolesInfo().then(([rows]) =>{
        let employees = rows;
        console.table(employees);
    })
    .then(()=> loadMainPrompts()
    );
}

// function to query for employees per department
function VIEW_EMPLOYEE_DEPARTMENTS()
{
    db.returnEmployeeByDepartment()
    .then(([rows]) =>{
        let employees = rows;
        console.table(employees)
       
    })
    .then(()=> loadMainPrompts()
    );
}


// function to query for all departments
function VIEW_ALL_DEPARTMENTS()
{
  
    db.returnAllDepartmentInfo()
    .then(([rows]) =>{
        let employees = rows;
        
        console.table(employees);
        const employeeChoices = employees.map(({id, name}) => ({
           
         }))
       
    })
    .then(()=>  loadMainPrompts() //.then(()=>console.table([deptid, deptN]))
    );

}
// function to query for employees by manager
function VIEW_ALL_EMPLOYEES_BY_MANAGER()
{
    db.returnListOfEmployeeByManager()
    .then(([rows]) =>{
        let employeeByManager = rows;
        console.table(employeeByManager);
        
    })
    .then(() => loadMainPrompts());
}

// query for employee table
function VIEW_EMPLOYEE_TABLE()
{
    db.returnEmployeeTable()
    .then(([rows]) =>{
        let employeTable = rows;
        console.table(employeTable);
    })
    .then(()=>{
        loadMainPrompts()
    })
}

// query to add department to database
function ADD_DEPARTMENT()
{
    prompt({
        type: "input",
        name: "deptAddition",
        message: "What is the name of the department: ",
       })
       .then((res) => {
        // running query on database
        db.addDepartment(res.deptAddition);
       
       })
       .then(() => loadMainPrompts());
     
}

//
// helper function to dislay all of departments in database
function getDeptInfo(){ 
    return db.returnAllDepartmentInfo()
.then(([rows]) =>{
    let departmentNames = rows;
    console.log("Dept:", departmentNames)
     const employeeChoices = departmentNames.map(({name}) =>{

        return name;

     })
     console.log("choices: ", employeeChoices)
     return employeeChoices
 
})
}

// helper function to dislay all of Roles in database
function getRoleInfo(){ 
    return db.returnAllRolesInfo()
.then(([rows]) =>{
    let roleInfo = rows;
    console.log("RoleInfo:", roleInfo)
     const roleChoices = roleInfo.map(({JobTitle}) =>{
  
        return JobTitle;
 
     })
     console.log("choices: ", roleChoices)
     return roleChoices
  
})
}

// helper function to dislay all of Manager Names in Database
function getManagerInfo(){ 
     return db.returnManagerID_Name()
.then(([rows]) =>{
    let ManagerInfo = rows;
   
     const managerChoices = ManagerInfo.map(({ManagerName}) =>{
   
        return ManagerName;
   
     })
     return managerChoices  
})
}

// helper function to dislay all of Employee Names in Database
function getEmployeeNames(){ 
    return db.returnEmployeeNames()
.then(([rows]) =>{
   let EmployeeNames = rows;
    console.log("Employee", EmployeeNames)
    const employeeChoices = EmployeeNames.map(({FirstName, LastName}) =>{
  
       return FirstName + ' ' + LastName;
  
    })
    return employeeChoices  
})
}





// function to add new role to DB
function ADD_ROLE()
{

    prompt
    ([
        {
            type: "input",
            name: "roleAddition",
            message: "What is the role you want to add: "
        },
        {
            type: "input",
            name: "salaryAddition",
            message: "Please enter in salary: "
        },
        {
            type: "list",
            name: "department",
            message: "Please choose department: ",
            choices: getDeptInfo
        }
    ])
    .then((res) => {
       let val = res.department
       
       returnDeptID(res.roleAddition, res.salaryAddition, val);
      
    }).then(()=>
    loadMainPrompts())
    

} 

// helper function to adding role to DB
function returnDeptID(role, salary, deptName)
{
    db.returnDepartmentID(deptName)
    .then(([rows]) =>{
    let deptID = rows;
    const num = deptID.map(({id}) =>{
        console.log('id: ', id)
        db.addRole(role, salary, id)
    return id})

})

}

// function to add new employee to DB
function ADD_EMPLOYEE()
{
    prompt
        ([
           
            {
                type: "input",
                name: "employeeFirstName",
                message: "Please enter in the first name of new employee: "
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "Please enter in the last name of new employee: "
            },
            {
                type: "list",
                name: "employeeRole",
                message: "Please enter in role for new employee: ",
                choices: getRoleInfo
            },
            {
                type: "list",
                name: "manager",
                message: "Please choose manager: ",
                choices: getManagerInfo
            }
        ]).then((res)=>{
        const EmployeeFName = res.employeeFirstName;
        const EmployeeLName = res.employeeLastName;
        const rolePick = res.employeeRole;
        const managerPick = res.manager;
        const managerFirstName = managerPick.split(' ')[0];
        const managerLastName = managerPick.split(' ')[1];
        
       getManagerID(managerFirstName, managerLastName, EmployeeFName, EmployeeLName);

    })
    .then(()=>{
        loadMainPrompts();
    })
}

// helper function to get manager id and update employee table with new employee
function getManagerID(Managerfirst, Managerlast,  EmployeeFName, EmployeeLName){ 
    console.log("loading manager id....")
    db.returnManagerID(Managerfirst, Managerlast)
    .then(([rows]) =>{
    let ManagerInfo = rows;
    console.log("ManagerInfo:", ManagerInfo)
     const manID = ManagerInfo.map(({ManagerID, RoleID}) =>{
     console.log('MID is', ManagerID)
     console.log('Role id is', RoleID)
     db.addEmployee(EmployeeFName, EmployeeLName, RoleID, ManagerID)   
     return ManagerID;

   
     })   
})
}


// function to update employee information
function UPDATE_EMPLOYEE()
{
    
    prompt
        ([
           
            {
                type: "list",
                name: "employeeName",
                message: "Which employee's role do you want to update? ",
                choices: getEmployeeNames
            },
        ]).then((res) =>{
       
            console.log("")
            helperFunctionUpdateEmployee(res.employeeName)
          
        })
       

}

// helper function #1 to get update employee information
function helperFunctionUpdateEmployee(employeeName)
{
    prompt
            ([
                {
                    type: "list",
                    name: "employeeRole",
                    message: `Please enter updated role for ${employeeName}: `,
                    choices: getRoleInfo
                },
            ])

    .then((res)=>{
        console.log('New employee role:',res.employeeRole)
        helperFunctionUpdateEmployee2(res.employeeRole, employeeName)
     
    })
    console.log('New employee role: ')

}

// helper function #2 to get update employee information
function helperFunctionUpdateEmployee2(roleName, employeeName)
{
    let fName = employeeName.split(' ')[0];
    let lName = employeeName.split(' ')[1];
    let deptID = 0;
    db.returnRoleID(roleName)
    .then(([rows]) =>{
        let roleID = rows;
        const num = roleID.map(({department_id}) =>{
            console.log('role id: ', department_id);
            console.log('First name', fName);
            console.log('Last name', lName);
           deptID = department_id;
            
  
    })
    })
    .then(()=> {
        db.updateEmployeeRole(deptID, fName, lName)
        loadMainPrompts();
    })
}
