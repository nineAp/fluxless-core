# Fluxless core

<p>It's page of a package fluxless core. It's the main package for work with state.</p>

# Philosophy

<p>Main reason of this package existing is a try to make a state management much simple than it is in other state management packages.</p>
<p>There is 3 main components: <b>Observer</b>, <b>Slice</b> and <b>Store</b>.</p>
<p> Observer here is a basement for the package. It is check the state and call subscribers whent it's change</p>
<p>Slice and Store works together. In the slice you can desribe your states and set your actions (from your application service maybe). From state you can get the value and useAction that you set. Store accumulate your slices and should have a possible to be accessible from every point of your application</p>

<p>Method useAction requires: </p>
<ol>
<li>What you change</li>
<li>How you change (function)</li>
<li> What it needs to change (func args)</li>
</ol>

```
    const counterSlice = new Slice(
      { count: 0 },
      { increment: (state: number, n: number) => state + n }
    );
    const store = new Store({ counter: counterSlice });

    const slice = store.getSlice("counter");
    const current = slice.getState("count").get();
    slice.useAction("count", "increment", current, 5);

    console.log(slice.getState("count").get()) //will be 5
```
