---
outline: deep
---

# Database Operations Functions

Database Operations Functions are a set of tools that allow you to interact with databases. These functions provide ways to execute SQL queries, insert data into a database, and retrieve specific data from a database. They can interact with any database that can be connected through a connection string, making them flexible and powerful tools for any kind of database operations.

## executeSQLQuery(connectionString, sqlQuery)

### Description

This function allows you to execute a SQL query on a database. It takes a connection string and a SQL query as parameters, and then executes the query on the database that is specified by the connection string.

### Data Type

connectionString : `String`

sqlQuery : `String`

return : `Array`

### Example


#### input

| Username | Password |
| -------- | -------- |
| user1    | pass1    |
| user2    | pass2    |
| user3    | pass3    |

```js
// assuming a valid connection string and SQL query
let result = LBS.executeSQLQuery("Data Source=localhost;Initial Catalog=MyDB;Integrated Security=True;", "SELECT * FROM Users");
console.log(result); // would log the result of the query
```

#### Return 


| Username | Password |
| -------- | -------- |
| user1    | pass1    |
| user2    | pass2    |
| user3    | pass3    |


## insertIntoTable(connectionString, tableName, columns, values)

### Description

This function inserts a row of values into a specific table in a database. It takes a connection string, a table name, an array of column names, and an array of corresponding values as parameters.

### Data Type

connectionString : `String`

tableName : `String`

columns : `Array`

values : `Array`

return : `Number`

### Example

#### input 

| Username | Password   |
| -------- | ---------- |
| bob      | pass1      |
| jack     | pass2      |

```js
// assuming a valid connection string and table
let result = LBS.insertIntoTable("Data Source=localhost;Initial Catalog=MyDB;Integrated Security=True;", "Users", ["username", "password"], ["myuser", "mypassword"]);
console.log(result); // would log the number of rows affected
```

#### Return 


| Username | Password   |
| -------- | ---------- |
| bob      | pass1      |
| jack     | pass2      |
| myuser   | mypassword |


## getColumnValueByIndex(connectionString, tableName, columnName, rowIndex)

### Description

This function retrieves a value from a specific column in a specific row of a database table. It takes a connection string, a table name, a column name, and a row index as parameters.

### Data Type

connectionString : `String`

tableName : `String`

columnName : `String`

rowIndex : `Number`

return : `Any`

### Example

#### input 

| Username   | Password   |
| ---------- | ---------- |
| bob        | pass1      |
| myuser     | pass2      |
| jack       | pass3      |

```js
// assuming a valid connection string and table
let value = LBS.getColumnValueByIndex("Data Source=localhost;Initial Catalog=MyDB;Integrated Security=True;", "Users", "username", 1);
console.log(value); // would log the value in the "username" column of the first row in the "Users" table
```

#### Return 


| Username |
| -------- |
| myuser   |

