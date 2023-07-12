---
outline: deep
---

# How to Use the Library

This page provides step-by-step instructions on how to effectively use the library.

## Adding the Library to Your Project

To start, import the library to a Global Definition by dragging it in. 

![Import Library](./Picture8.png)

After importing, the library should look like this in your project's code:

```js
import * as XXX from "YY_Y_Y_Y_YY";
```

## Renaming the Library

It's recommended to replace the `XXX` with an appropriate name. For example, we use `LBS` throughout this documentation. Here's what the import line should look like after renaming:

```js
import * as LBS from "YY_Y_Y_Y_YY";
```

## Testing the Library

Once the library is properly imported and renamed, test it by generating a random number. 

```js
HMIRuntime.Trace(LBS.getRandomNumber(1, 10))
```

This function should output a random number between 1 and 10 in the trace.

If you see the random number in the trace, the library is working correctly! Feel free to explore the rest of the documentation and don't hesitate to provide your valuable feedback.
