// --- Section 1: Coding Tasks (40 points) ---

// Task 1: Remove duplicates from an array of contacts
function removeDuplicates(arr) {
    const uniqueArr = [];
    const uniqueSet = new Set();
    
    arr.forEach(contact => {
        const key = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
        if (!uniqueSet.has(key)) {
            uniqueSet.add(key);
            uniqueArr.push(contact);
        }
    });
    
    return uniqueArr;
}

// Example usage:
const contacts = [
    {firstName: 'John', middleName: 'A', lastName: 'Doe'},
    {firstName: 'Jane', middleName: 'B', lastName: 'Doe'},
    {firstName: 'John', middleName: 'A', lastName: 'Doe'}
];
console.log(removeDuplicates(contacts));

// Task 2: Merge two objects
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

// Example usage:
const obj1 = { name: 'Alice', age: 25 };
const obj2 = { age: 30, city: 'New York' };
console.log(mergeObjects(obj1, obj2));

// --- Section 2: Scenario-Based Questions (60 points) ---

// Scenario 1: Debugging
function incrementArray(arr) {
    return arr.map(num => num + 1);
}

console.log(incrementArray([1, 2, 3])); // Output: [2, 3, 4]

// Scenario 2: Closures
function outer() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const increment = outer();
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2

// Scenario 4: Data Manipulation
function getAdultNames(users) {
    return users.filter(user => user.age >= 18).map(user => user.name);
}

const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 17 }
];
console.log(getAdultNames(users)); // Output: ['John']

// Scenario 5: Asynchronous Data Handling
async function fetchUserPosts(apiUrl) {
    const response = await fetch(apiUrl);
    const users = await response.json();
    
    const allPosts = [];
    for (const user of users) {
        const postsResponse = await fetch(`${apiUrl}/users/${user.id}/posts`);
        const posts = await postsResponse.json();
        allPosts.push(...posts);
    }
    
    return allPosts;
}

// Scenario 6: Memoization
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const add = (a, b) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // Output: 3
console.log(memoizedAdd(1, 2)); // Cached result, Output: 3
