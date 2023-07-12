---
outline: deep
---

# Array Operations Functions

Array Operations Functions are a specialized set of tools designed to perform various operations on `Array` data types. While they are primarily intended to manipulate arrays, their flexibility allows them to function effectively with `HMIRuntime.Tags` as well. These utility functions offer a simple and efficient way to retrieve, analyze, and manage data stored in `Arrays` or `HMIRuntime.Tags`, making them a powerful aid in a wide range of programming tasks.

## getArrayMaxValue(array)

### Description

Returns the maximum value in the array.

### Data Type

array : `Array`

return : `Number`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let maxVal = LBS.getArrayMaxValue("myTag");
console.log(maxVal); // would log maximum value from the array
```

#### Return 

```js
consoleLog : 5 // considering [1,2,3,4,5] as the array
```

## getArrayMinValue(array)

### Description

Returns the minimum value in the array.

### Data Type

array : `Array`

return : `Number`

### Example

```js
// assuming myTag is an array like [5,4,3,2,1]
let minVal = LBS.getArrayMinValue("myTag");
console.log(minVal); // would log minimum value from the array
```

#### Return 

```js
consoleLog : 1 // considering [5,4,3,2,1] as the array
```

## getArrayLength(array)

### Description

Returns the length of the array. This function provides a straightforward method for determining the number of elements in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Number`

### Example

```js
// assuming myTag is an array like [5,4,3,2,1]
let length = LBS.getArrayLength("myTag");
console.log(length); // would log the length of the array
```

#### Return 

```js
consoleLog : 5 // considering [5,4,3,2,1] as the array
```

## sortArray(array)

### Description

Sorts the elements in the array in ascending order. This function is an effective way to organize data in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Array`

### Example

```js
// assuming myTag is an array like [5,1,4,2,3]
let sortedArray = LBS.sortArray("myTag");
console.log(sortedArray); // would log the sorted array
```

#### Return 

```js
consoleLog : [1,2,3,4,5] // considering [5,1,4,2,3] as the input array
```

## reverseSortArray(array)

### Description

Sorts the elements in the array in descending order. This function allows to reverse the order of data in an `Array` or `HMIRuntime.Tag`, which can be useful in different scenarios.

### Data Type

array : `Array`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,3,2,5,4]
let reversedSortedArray = LBS.reverseSortArray("myTag");
console.log(reversedSortedArray); // would log the array sorted in reverse order
```

#### Return 

```js
consoleLog : [5,4,3,2,1] // considering [1,3,2,5,4] as the input array
```

## removeArrayValueByIndex(array, index)

### Description

Removes an element from the array at a specified index. This function enables precise control over the contents of an `Array` or `HMIRuntime.Tag` by allowing specific elements to be removed.

### Data Type

array : `Array`

index : `Number`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let updatedArray = LBS.removeArrayValueByIndex("myTag", 2); // removing element at index 2
console.log(updatedArray); // would log the updated array
```

#### Return 

```js
consoleLog : [1,2,4,5] // considering [1,2,3,4,5] as the input array and 2 as the index
```

## insertArrayValueAtIndex(array, index, value)

### Description

Inserts a value into the array at the specified index. This function is an efficient method for adding new elements to an `Array` or `HMIRuntime.Tag` at any given position.

### Data Type

array : `Array`

index : `Number`

value : `Any`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,4,5]
let updatedArray = LBS.insertArrayValueAtIndex("myTag", 2, 3); // inserting value 3 at index 2
console.log(updatedArray); // would log the updated array
```

#### Return 

```js
consoleLog : [1,2,3,4,5] // considering [1,2,4,5] as the input array, 2 as the index and 3 as the value
```

## ArrayHasDuplicates(array)

### Description

Checks if the array has duplicate values. This function is a quick and efficient way to assess the uniqueness of the elements in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Boolean`

### Example

```js
// assuming myTag is an array like [1,2,3,2,5]
let hasDuplicates = LBS.ArrayHasDuplicates("myTag");
console.log(hasDuplicates); // would log whether the array has duplicates or not
```

#### Return 

```js
consoleLog : true // considering [1,2,3,2,5] as the input array
```

## ArrayUniqueValues(array)

### Description

Returns an array of unique values from the input array. This function simplifies the process of identifying and collecting unique elements from an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,3,2,5]
let uniqueValuesArray = LBS.ArrayUniqueValues("myTag");
console.log(uniqueValuesArray); // would log the array of unique values
```

#### Return 

```js
consoleLog : [1,2,3,5] // considering [1,2,3,2,5] as the input array
```
## concatenateArrays(array1, array2)

### Description

Concatenates two arrays. This function offers a straightforward way to merge two `Array` or `HMIRuntime.Tag` elements into a single array.

### Data Type

array1 : `Array`

array2 : `Array`

return : `Array`

### Example

```js
// assuming myTag1 is an array like [1,2,3] and myTag2 is an array like [4,5,6]
let concatenatedArray = LBS.concatenateArrays("myTag1", "myTag2");
console.log(concatenatedArray); // would log the concatenated array
```

#### Return 

```js
consoleLog : [1,2,3,4,5,6] // considering [1,2,3] and [4,5,6] as the input arrays
```

## compareArrays(array1, array2)

### Description

Compares two arrays for equality. This function is a reliable tool to determine if two `Array` or `HMIRuntime.Tag` elements contain exactly the same elements in the same order.

### Data Type

array1 : `Array`

array2 : `Array`

return : `Boolean`

### Example

```js
// assuming myTag1 is an array like [1,2,3] and myTag2 is an array like [1,2,3]
let arraysAreEqual = LBS.compareArrays("myTag1", "myTag2");
console.log(arraysAreEqual); // would log whether the arrays are equal or not
```

#### Return 

```js
consoleLog : true // considering [1,2,3] and [1,2,3] as the input arrays
```

## getArrayCountOccurrences(array, value)

### Description

Counts the number of occurrences of a value in the array. This function provides a simple way to analyze the frequency of specific elements in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`
value : `Any`

return : `Number`

### Example

```js
// assuming myTag is an array like [1,2,3,2,5,2]
let countOccurrences = LBS.getArrayCountOccurrences("myTag", 2); // count occurrences of 2
console.log(countOccurrences); // would log the number of occurrences
```

#### Return 

```js
consoleLog : 3 // considering [1,2,3,2,5,2] as the input array and 2 as the value
```

## shuffleArray(array)

### Description

Shuffles the elements of the array. This function randomizes the order of elements in an `Array` or `HMIRuntime.Tag`, making it useful in scenarios where randomness is required.

### Data Type

array : `Array`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let shuffledArray = LBS.shuffleArray("myTag");
console.log(shuffledArray); // would log the shuffled array
```

#### Return 

```js
// The output will be a permutation of the input array, such as [3,1,2,5,4] or [5,2,1,4,3], etc.
// Due to the random nature of the shuffle, the output can vary on each execution.
```

## findArrayValue(array, value)

### Description

Checks if a value exists in the array. This function offers a simple way to verify the presence of a specific element in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

value : `Any`

return : `Boolean`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let valueExists = LBS.findArrayValue("myTag", 3); // checking if 3 exists in the array
console.log(valueExists); // would log whether the value exists or not
```

#### Return 

```js
consoleLog : true // considering [1,2,3,4,5] as the input array and 3 as the value
```

## findArrayValueIndex(array, value)

### Description

Finds the index of a value in the array. This function helps in identifying the position of a specific element in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

value : `Any`

return : `Number`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let valueIndex = LBS.findArrayValueIndex("myTag", 3); // finding the index of 3
console.log(valueIndex); // would log the index of the value
```

#### Return 

```js
consoleLog : 2 // considering [1,2,3,4,5] as the input array and 3 as the value
```

## removeArrayValue(array, value)

### Description

Removes a specific value from the array. This function allows for targeted removal of a single occurrence of a specific element in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

value : `Any`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,3,2,5,2]
let updatedArray = LBS.removeArrayValue("myTag", 2); // removing first occurrence of 2
console.log(updatedArray); // would log the updated array
```

#### Return 

```js
consoleLog : [1,3,2,5,2] // considering [1,2,3,2,5,2] as the input array and 2 as the value
```

## removeArrayValues(array, value)

### Description

Removes all occurrences of a specific value from the array. This function is effective for cleaning an `Array` or `HMIRuntime.Tag` of all instances of a specific element.

### Data Type

array : `Array`

value : `Any`

return : `Array`

### Example

```js
// assuming myTag is an array like [1,2,3,2,5,2]
let updatedArray = LBS.removeArrayValues("myTag", 2); // removing all occurrences of 2
console.log(updatedArray); // would log the updated array
```

#### Return 

```js
consoleLog : [1,3,5] // considering [1,2,3,2,5,2] as the input array and 2 as the value
```

## arrayDifference(array1, array2)

### Description

Returns the difference between two arrays. This function is useful for identifying elements that are present in one `Array` or `HMIRuntime.Tag` but not in another.

### Data Type

array1 : `Array`

array2 : `Array`

return : `Array`

### Example

```js
// assuming myTag1 is an array like [1,2,3,4,5] and myTag2 is an array like [4,5,6]
let differenceArray = LBS.arrayDifference("myTag1", "myTag2"); // getting the difference between the arrays
console.log(differenceArray); // would log the difference array
```

#### Return 

```js
consoleLog : [1,2,3] // considering [1,2,3,4,5] and [4,5,6] as the input arrays
```

## arraySum(array1, array2)

### Description

Sums the elements of two arrays. This function offers a quick way to combine the elements of two `Array` or `HMIRuntime.Tag` elements in a pairwise manner.

### Data Type

array1 : `Array`

array2 : `Array`

return : `Array`

### Example

```js
// assuming myTag1 is an array like [1,2,3] and myTag2 is an array like [4,5,6]
let sumArray = LBS.arraySum("myTag1", "myTag2"); // summing the arrays
console.log(sumArray); // would log the summed array
```

#### Return 

```js
consoleLog : [5,7,9] // considering [1,2,3] and [4,5,6] as the input arrays
```

## getArraySum(array)

### Description

Returns the sum of the elements in the array. This function allows for easy computation of the total sum of all elements in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Number`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let totalSum = LBS.getArraySum("myTag"); // getting the total sum
console.log(totalSum); // would log the total sum
```

#### Return 

```js
consoleLog : 15 // considering [1,2,3,4,5] as the input array
```

## getArrayAverage(array)

### Description

Returns the average of the elements in the array. This function provides a convenient way to calculate the mean value of the elements in an `Array` or `HMIRuntime.Tag`.

### Data Type

array : `Array`

return : `Number`

### Example

```js
// assuming myTag is an array like [1,2,3,4,5]
let averageValue = LBS.getArrayAverage("myTag"); // getting the average value
console.log(averageValue); // would log the average value
```

#### Return 

```js
consoleLog : 3 // considering [1,2,3,4,5] as the input array
```
## pushToTagArray(tagName, array)

### Description

Pushes elements to a tag array. This function allows you to append elements from a source `Array` to a `HMIRuntime.Tag`, extending its length.

### Data Type

tagName : `String`

array : `Array`

return : `Void`

### Example

```js
// assuming myTag is a tag array like [1,2,3] and myArray is an array like [4,5,6]
LBS.pushToTagArray("myTag", myArray); // pushing elements to the tag array
```

## populateTagArray(tagName, array)

### Description

Populates a tag array with values from another array. This function allows you to replace the contents of a `HMIRuntime.Tag` with the elements from a source `Array`.

### Data Type

tagName : `String`
array : `Array`

return : `Void`

### Example

```js
// assuming myTag is a tag array and myArray is an array like [1,2,3]
LBS.populateTagArray("myTag", myArray); // populating the tag array
```

## getArrayFromTags(array)

### Description

Fetches an array from tags. This function retrieves the contents of a `HMIRuntime.Tag` and returns them as an `Array`.

### Data Type

array : `Array of String`

return : `Array`

### Example

```js
// assuming myTags is an array of tag names like ['tag1', 'tag2', 'tag3']
let valuesArray = LBS.getArrayFromTags(myTags); // fetching array from tags
console.log(valuesArray); // would log the fetched array
```

#### Return 

```js
// The output will be an array of values from the tags. 
// The exact values will depend on the current values stored in the tags.
```

