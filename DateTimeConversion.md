---
outline: deep
---

# Date-Time Conversion Functions

Date-Time Conversion Functions provide a set of tools for manipulating and converting time and date information. These functions facilitate conversions between different time formats, time zones, and string representations, offering an effective way to handle date-time related operations in your programs.

## convertTimeFormat(utcMilliseconds, format)

### Description

This function takes in the time in UTC milliseconds and a desired format. It then converts the time from UTC milliseconds into the requested format. The format parameter could be 0, 1 or 2, each representing a different time format.

### Format descriptions:
- Format 0: milliseconds, seconds, minutes, hours, day, month, year
- Format 1: hours:minutes, year-month-day
- Format 2: hours:minutes:seconds, year-month-day

### Data Type

utcMilliseconds : `Number`

format : `Number`

return : `String`

### Example

```js
// Convert a date-time in UTC milliseconds to format 1
console.log(LBS.convertTimeFormat(Date.now(), 1));
```

#### Return 

```js
consoleLog : "14:00, 2023-07-12" // Example output, actual will vary
```

...

## convertUTCToTimeZone(time, format, timeZone)

### Description

This function takes in a UTC time, a desired format and a timezone. It then converts the UTC time into the specified timezone format. If the input time is a string, it is first converted to UTC milliseconds before the conversion.

### Format descriptions:
- Format 0: seconds, minutes, hours, day, month, year
- Format 1: hours:minutes, year-month-day
- Format 2: hours:minutes:seconds, year-month-day

### Data Type

time : `Number` or `String`

format : `Number`

timeZone : `String`

return : `String`

### Example

```js
// Convert a date-time in UTC milliseconds to Pacific Time in format 2
console.log(LBS.convertUTCToTimeZone(Date.now(), 2, "America/Los_Angeles"));
```

#### Return 

```js
consoleLog : "07:00:00, 2023-07-12" // Example output, actual will vary
```

...

## convertTimeZoneToUTC(timeString, format, currentTimeZone)

### Description

This function takes in a string of time in a specific timezone, a desired format and the current timezone. It then converts the string of time from the current timezone to UTC time, and returns it in the specified format.

### Format descriptions:
- Format 0: seconds, minutes, hours, day, month, year
- Format 1: hours:minutes, year-month-day
- Format 2: hours:minutes:seconds, year-month-day

### Data Type

timeString : `String`

format : `Number`

currentTimeZone : `String`

return : `String`

### Example

```js
// Convert a date-time string from Pacific Time to UTC in format 1
console.log(LBS.convertTimeZoneToUTC("14:00:00, 2023-07-12", 1, "America/Los_Angeles"));
```

#### Return 

```js
consoleLog : "21:00, 2023-07-12" // Example output, actual will vary
```
