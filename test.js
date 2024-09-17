// --- Section 1: Coding Tasks (40 points) ---

// Task 1: Remove duplicates from an array of contacts
function removeDuplicates(arr) {
  const uniqueMap = new Map(); // Map to store unique contact keys.

  /**
   * iterates over the array using filter method
   * for each contact, generate a key string (combining firstName, middleName, and lastName).
   * If the Map doesn't already contain the key,
   * the contact is considered unique, added to the Map, and kept in the filtered result.
   */
  return arr.filter((contact) => {
    const key = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, true);
      return true;
    }
    return false;
  });
}

// Example usage:
const contacts = [
  { firstName: 'Mark', middleName: 'Anthony', lastName: 'Omin' },
  { firstName: 'Mark', middleName: 'Anthony', lastName: 'Omin' },
  { firstName: 'John', middleName: 'A', lastName: 'Doe' },
  { firstName: 'John', middleName: 'A', lastName: 'Joel' },
  { firstName: 'John', middleName: 'D', lastName: 'Doe' },
  { firstName: 'John', middleName: 'A', lastName: 'Doe' },
  { firstName: 'Jane', middleName: 'C', lastName: 'Doe' },
];

console.log(removeDuplicates(contacts));

// Task 2: Merge two objects
/**
 *
 * @param {*} obj1
 * @param {*} obj2
 * @returns {*} // a merged object
 * all values within the objects being merged should be returned
 * this is achieved using a spread operator {...}
 * based on the order of the params, if both params have values with the same keys,
 * the value in the second object overwrites the one in the first
 */
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// Example usage:
const obj1 = { name: 'Willis Raburu', profession: 'Journalist', age: 23 };
const obj2 = {
  gender: 'male',
  residence: 'Nairobi',
  phoneNumber: '0700123123',
  age: 39,
};
console.log(mergeObjects(obj1, obj2));

// --- Section 2: Scenario-Based Questions (60 points) ---

// Scenario 1: Debugging --> Correct the increment function.
/**
 *
 * @param {*} arr
 * @returns // an array
 * iterate over each element in the arr
 * increment each element in the arr
 * return an array with each key incremented
 */
function incrementArray(arr) {
  return arr.map((num) => num + 1);
}

console.log(incrementArray([9, 12, 33])); // Output: [10, 13, 34]

// Scenario 2: Closures --> Explain closures with an example.
/**
 * Closures: refers to a function nested inside another that has access
 * to it's outer function even after the outer one has finished executing
 * the function is therefore able to remember the environment in which it was created
 * the scenario in this case has the function outer,
 * with an inner anonymous function that increments the count and returns it
 * when outer is called, an invocation of outer() occurs which initializes count to 0
 * every time increment is called, it increments the count and returns the new value
 */
function outer() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const increment = outer(); // outer will return the inner function and assign it to increment
console.log(increment()); // Output: 1 --> increases value of count from 0 to 1
console.log(increment()); // Output: 2 --> count is now 1, and then incremented to 2
console.log(increment()); // Output: 3 --> count is now 2, and is then incremented to 3

// Scenario 4: Data Manipulation --> Implement the function getAdultNames(users) to filter users by age.
/**
 *
 * @param {*} users
 * @returns [user]
 * filter to check for adult users, since the filter methods checks for a condition
 * (optional) --> in case you want a more granular value returned, you can map
 * ---> e.g, map and only return names of adult users
 */
function getAdultNames(users) {
  return users
    .filter((user) => user.age >= 18) // checks for users with age >=18
    .map((user) => user.name); // returns an array of those users' name
}

const users = [
  { name: 'Namu', age: 40 },
  { name: 'Emma', age: 16 },
  { name: 'Mwakazi', age: 36 },
  { name: 'Indah', age: 13 },
  { name: 'Tony', age: 130 },
];
console.log(getAdultNames(users)); // Output: ['Namu', 'Mwakazi', 'Tony']

// Scenario 5: Asynchronous Data Handling
// performs async operations and returns a promise
async function fetchUserPosts(apiUrl) {
  // catches any errors that occur during the async operations
  try {
    const response = await fetch(`${apiUrl}/users`); // pauses the operation until fetch promise is resolved
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const users = await response.json(); // parses the response body as JSON

      const allPosts = []; // stores all posts for each user
      // iterate over each user
      // for each, a GET request is made to return all their posts
      // separate try-catch to handle errors related to fetching posts
      for (const user of users) {
        try {
          const postsResponse = await fetch(`${apiUrl}/users/${user.id}/posts`);
          if (!postsResponse.ok) {
            throw new Error(`Response status: ${postResponse.status}`);
          } else {
            const posts = await postsResponse.json();
            allPosts.push(...posts); // posts are added to allPosts using spread operator
          }
        } catch (error) {
          console.error(error.message);
        }
      }
      console.log(allPosts);
      return allPosts;
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Example usage:
fetchUserPosts('https://jsonplaceholder.typicode.com');

// Scenario 6: Memoization
// Will use factorials to demo how memoization works
function memoize(fn) {
  const cache = new Map(); // create a new map object. handles non-string keys. preserves order of insertions.
  return function (...args) {
    const key = JSON.stringify(args); // Convert the arguments to a string key
    if (cache[key]) return cache[key]; // Early return of cached result if available
    const result = fn(...args); // Call the original function
    cache.set(key, result); // Cache the result
    return result;
  };
}

/**
 * Factorials
 * Are usually computationally expensive for large numbers
 * memoization makes it possible to use cached values to speed up the calculations
 * I will also measure the computation time for each result which will show that memoization speeds up the time immensely
 */
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

// Memoized factorial function
const memoizedFactorial = memoize(factorial);


// Example usage:
console.log(memoizedFactorial(5)); // Output: 120 (calls the original function)
console.log(memoizedFactorial(5)); // Output: 120 (cached result)
console.log(memoizedFactorial(6)); // Output: 720 (uses cached factorial(5) result)

// Measure time for memoized factorial
console.time('Memoized factorial first call');
console.log(memoizedFactorial(5));
console.timeEnd('Memoized factorial first call');

// Measure time for cached memoized factorial
console.time('Memoized factorial second call');
console.log(memoizedFactorial(5));
console.timeEnd('Memoized factorial second call');

// Measure time for cached memoized factorial
console.time('Memoized factorial using cached factorial(5) result');
console.log(memoizedFactorial(6));
console.timeEnd('Memoized factorial using cached factorial(5) result');

