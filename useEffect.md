# useEffect
- provides a way to manage side effects in React functional component
  
useEffect hook can replicate the behavior for
- componentDidMount
- componentDidUpdate
- componentWillUnmount
  
## Syntax
```js
useEffect(()=>{

    return ()=>{

    }
},[]);
```

In reality, useEffect hook synchronizes rather thean being run after every re-render.

It looks for changes in props and state variable. If nothing changes it skips calling useEffect.