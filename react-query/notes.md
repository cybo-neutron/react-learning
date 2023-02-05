# **React - Query**

### **Installation**
```
npm install react-query
OR
yard add react-query
```

### **Project setup**

- import `QueryClientProvider` and  `QueryClient` 
- Create a new instance of `QueryClient` 
- Wrap the app with `QueryClientProvider` like shown below


```js
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();


//Wrap the whole app with QueryClient provider
<QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
</QueryClientProvider>

```

### **Basic usage**

Conventionally if we don't use React-query library then we will have to use the useEffect hook to make a fetch request on first render and set the state objects on succeessfull or unsuccessfull fetch.

But using react-query we dont need to worry about the fetch request and handling the state based on the response. (states include isLoading, success, error etc.)

- import `useQuery` hook
- `useQuery` takes 2 mandatory parameters `queryKey`(any string or array value) and `queryFunction` . (Read more about it [here](https://react-query-v3.tanstack.com/reference/useQuery)). queryFunction should return a promise. (In the given example axios.get is being returned which is a promise)
- Now we can extract various states from the useQuery hook (like data, isLoading ,isError and [more](https://react-query-v3.tanstack.com/reference/useQuery))


```js
import { useQuery } from "react-query";

const { data, isLoading } = useQuery("query-key", () => {
    return axios.get(url);
});

if (isLoading) {
    return <h2>Loading.....</h2>;
}

return (
    <div>
      <h2 className="bold text-xl">RQ Super Heroes page</h2>
      {data.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
);
```

### **Handling error**

useQuery exposes two states where details of error is stored.
`isError` and  `error` 

- isError : boolean
- error : details of error

We can extract these out in our useQuery hook like below

**NOTE :** *React query automatically retries if fetch fails.* 

```js
const { data, isLoading, isError, error } = useQuery(
"query-key",
    () => {
        return axios.get(url);
    }
);

if (isError) {
    return <h2>{error.message}</h2>;
}

```