## What is the purpose of this project?

It's just a sample application to show how to leverage advanced [object oriented programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming), SOLID, compositions and component based design along Vue.js best practices to gain cleaner code structure, more maintainable and reusable code base also better code coherence.
<br/>


## A summary of what I did and why, in case you were interested:

For diving deeper into this topic and get more details please have look at this.

But as a summary I can mention these:

- I imagined this application is bigger than it is and tried to implement some concepts suited for that scale.

- Basically I tried to design an architecture into 3 main layers. Somehow similar to MVP or MVVM.

1. UI/Presentation layer: (pages and components) are placed in /views and /components. Also I tried to respect the [separated presentation principle](https://martinfowler.com/eaaDev/SeparatedPresentation.html) and just keep the UI logic there.

2. Logic/Business layer: Logical components are in /services and /logical-components. With this approach I tried to separate service logic including API calls or maybe in future working with vendors and third-parties from application logic. These two groups have access to each other loosely and via interfaces. Also they don't have a tight coupling to the UI layer.

3. Model/State layer: For keeping models/types and global state of the application.

- Also I tried to make a balance between Object Oriented Programming and semi-functional programming paradigms.

- Presentation layer has access to the business layer via an abstraction of interfaces. Except for the custom hooks, it was possible to create an abstraction for them as well but I thought it would be over engineering!

- I've implemented dependency injection with IOC container and constructor injection and used provide/inject API to inject them to the presentation layer. Both logical-components and services have their own IOC container and context. Maybe even using the context is not necessary since the IOC container can do the injecting as well! Probably it's a good idea when we are separating our application in isolated modules. But still I just kept them to show the usage!

- I could keep the state in the parent component but just used a state management piece to show the usage. I've chosen [pinia](https://github.com/vuejs/pinia) for its simplicity and the fact that it's recommended for Vue 3. It was possible to separate companies and time-slots or even groups inside the state but again I guessed the data is not going to be huge so I tried to keep it simple.

## TODO

- The app definitely should have a lot more unit tests. We can have a couple of E2E tests as well.


## Running the web client

Please run:

```
yarn
```

And then

```
yarn dev
```

Application will start on port 5000

## Running unit (and snapshot) tests

Please run:

```
yarn test:unit:update
```
