# LBS: Library for WinCC Unified

https://rynstick.github.io/LBS/

LBS is a powerful, specialized library designed to enhance the functionality and efficiency of WinCC Unified. The library offers a set of utility functions that perform a variety of operations, making it easier for developers to handle common tasks. 

The library consists of the following categories:

## 1. Array Operations Functions
These functions perform various operations on Array data types and HMIRuntime.Tags. They include operations such as getting the maximum or minimum value from an array, pushing elements to a tag array, populating a tag array with values from another array, and fetching an array from tags. 

## 2. Date-Time Conversion Functions
These functions provide tools for handling and manipulating date and time formats. They can convert time in UTC milliseconds into desired formats, convert a string of time to UTC time in milliseconds, convert a UTC time into a specified timezone format, and convert a string of time in a specific timezone to UTC time.

## 3. Database Operations Functions
Database operations functions are designed to interact with databases. They can execute SQL queries, insert values into a table, and retrieve a value from a column in a database given specific parameters such as a connection string, a table name, columns, and values.

## 4. Others Functions
These utility functions don't fall into the other categories, but they still offer value for various programming tasks. For example, the `getRandomNumber` function generates a random number within a specified range.

Each function is thoroughly documented, including descriptions, data type specifications, examples, and returns. This makes LBS an easily accessible and user-friendly tool for developers working with WinCC Unified.

## Languages Used

This project is primarily written in **JavaScript**
