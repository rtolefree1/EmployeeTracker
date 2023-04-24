// using my connection.js file to connect to databae
const  connection = require('./connection');

class DB
{
    // constructor is needed, creating connection
    constructor(connection){
        this.connection = connection;
        console.log('constructor running');
    }

    // Select from tables Employee and Role
    returnAllEmployeeTitleSalaryInfo(){
        console.log('Running the AllEmployee method()')
        
        return this.connection.promise().query(
            `SELECT emp1.id, emp1.first_name, emp1.last_name, ROLE.title, ROLE.salary, department.name AS Department, CONCAT(emp2.first_name,' ' , emp2.last_name) AS ManagerName, emp2.manager_id AS ManagerID
            from employee AS emp1
            INNER JOIN ROLE 
            ON ROLE.id = emp1.id
            INNER JOIN department
            ON ROLE.department_id = department.id
            LEFT JOIN employee as emp2
            ON emp1.id = emp2.manager_id`
        );
    }

    // SQL query to return all role information
    returnAllRolesInfo()
    {
        
        return this.connection.promise().query(
        `SELECT title AS 'JobTitle',ROLE.ID AS RoleID, name AS 'DepartmentName', salary AS 'Salary'
        FROM ROLE
        LEFT JOIN department
        on ROLE.department_id = department.id;`
        );
    }

    // SQL query to return all department information
    returnAllDepartmentInfo()
    {
        console.log('Running the AllDepartment')
        return this.connection.promise().query(
            `SELECT *
            FROM DEPARTMENT;`
        );
    }

    // SQL query to return employee table
    returnEmployeeTable()
    {
        console.log('Running the AllDepartment')
        return this.connection.promise().query(
            `SELECT *
            FROM employee;`
        );
    }

    // SQL query to return list of employee by manager
    returnListOfEmployeeByManager()
    {
        return this.connection.promise().query(
            `SELECT emp2.id as EmployeeID, CONCAT(emp2.first_name,' ', emp2.last_name) AS Employee, CONCAT(emp1.first_name,' ' , emp1.last_name) AS ManagerName, emp2.manager_id AS ManagerID
            FROM employee as emp1
            INNER JOIN employee as emp2
            ON emp1.id = emp2.manager_id;`
        )
    }

    // SQL query to return employees by department
    returnEmployeeByDepartment(){
        return this.connection.promise().query(`
        SELECT emp1.id, emp1.first_name, emp1.last_name, ROLE.title, ROLE.salary, department.name AS Department
            from employee AS emp1
            INNER JOIN ROLE 
            ON ROLE.id = emp1.id
            INNER JOIN department
            ON ROLE.department_id = department.id`
        );
    }

    /*****************************/
    /** BEGINNING: CITING SAURAV NOTES FOR THE BELOW QUERIES this section only*/
    /*****************************/
    findAllPossibleManagers(employeeID)
    {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeID
        )
    }

    // Creation of new employee
    createEmployee(employee){
        return this.connection.promise().query("INSERT INTO employee SET ?" , employee)
    }

    // Removal of employee with the given id
    removeEmployee(employeeID){
        return this.connection.promise().query("DELETE FROM employee WHERE id = ?", employeeID)
    }

    // add department
    addDepartment(DepartmentName){
        return this.connection.promise().query(`INSERT INTO department(name)
        VALUES ('${DepartmentName}')`);
    /*****************************/
    /** END: CITING SAURAV NOTES FOR THE BELOW QUERIES this section only*/
    /*****************************/
        
    }

    // add Role
    addRole(title, salary, department_id)
    {
        return this.connection.promise().query(`INSERT INTO role(title, salary, department_id)
         VALUES ('${title}', ${salary}, ${department_id})`)
    }

    // returning department id
    returnDepartmentID(departmentName)
    {
        return this.connection.promise().query(`
        SELECT dept.id
        from department AS dept
        where dept.name = '${departmentName}';
        `)
    }

    // adding employee
    addEmployee(first_name, last_name, roleID, managerID)
    {
        return this.connection.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES ('${first_name}', '${last_name}', ${roleID}, ${managerID})`)
    }

    // returning the manager id and manager name
    returnManagerID_Name()
    {
        return this.connection.promise().query(`
        SELECT emp1.id, CONCAT(emp1.first_name,' ' , emp1.last_name) AS ManagerName, emp2.manager_id as ManagerID
        FROM employee as emp1
        INNER JOIN employee as emp2
        ON emp1.id = emp2.manager_id;`)
    }

    // returning manager id
    returnManagerID(first_name, last_name)
    {
        return this.connection.promise().query(`
        SELECT id as ManagerID, role_id as RoleID
        FROM employee
        WHERE first_name='${first_name}' and last_name='${last_name}'      
        `)
    }

    // returning employee names
    returnEmployeeNames()
    {
        return this.connection.promise().query(`
        SELECT first_name AS FirstName, last_name AS LastName, CONCAT(first_name, ' ', last_name) AS FullName
        FROM employee;`)
    }

    // returning role id
    returnRoleID(roleName)
    {
        return this.connection.promise().query(`
        SELECT department_id
        FROM role
        WHERE title = '${roleName}'
        `)
    }
    
    // update employe role
    updateEmployeeRole(id, first_name, last_name)
    {
        //console.log('id', id, ' first name', first_name, ' last name', last_name)
        return this.connection.promise().query(`
        UPDATE employee
        SET role_id = ${id}
        WHERE first_name='${first_name}' and last_name='${last_name}';
        `)
    }

   
}

module.exports = new DB(connection)