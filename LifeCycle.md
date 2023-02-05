# **LifeCycle of React App**

There are 4 essential phases of a React Component
1. **Mounting** : Coomponent is created and inserted into the `DOM`
2. **Updating** : Changes in props and states.
3. **Unmounting** : Component removed from the `DOM`.
4. **Error Handling** : 


## **LifeCycle methods**

1. **Mounting** 
   - constructor
   - static getDerivedStateFromProps
   - render
   - componentDidMount
2. **Updating**
   - static getDerivedStateFromProps
   - shouldComponentUpdate
   - render
   - getSnapshotBeforeUpdate
   - componentDidUpdate
3. **Unmounting**
   - componentWillUnmount
4. **Error Handling**
   - static getDerivedStateFromError
   - componentDidCatch

### getDerivedStateFromProps
This method is called/invoked before the component is rendered to the DOM on the initial mount.


### getSnapshotBeforeUpdate
stores the previous version of application before uploading the changes.

In updating phase this lifecycle method is called right after the `render` method.


//Todo: syntax

`getSnapshotBeforeUpdate` lifecycle method doesn't work on its own. we need to used it in conjunction with the `componentDidUpdate` lifecycle method.


## Error Handling

When things fo bad errros are thrown. The error lifecycle methods are invoked when an error is thrown by a descendant component.

`ErrorBoundary` component.

### getDerivedStateFromError
This method is called first whenever there is an error in a descendant component. The `error` thrown is passes as an argument.

The return value of this component is used to update the state of the component.

Syntax
```js
static getDerivedStateFromError(err){
    console.log(`Error ${err}`);
    return {hasError : true}
}
```

### componentDidCatch

this method is called after an error in a descendant component is thrown.
