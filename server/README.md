## Design architecture
Since our presentation layer is very simple, I’ve prevented using MVP or MVVM and came up with MCV to focus more on logic and introduced a service layer to separate the logic even in more details.

## Layers
![Architecture diagarm](https://github.com/aliafsahnoudeh/c-sharp-local-chat-solid/blob/main/c-sharp-local-chat-solid_diagram.jpg?raw=true)

## Data flow
The flow is pretty standard, directly from upper layer to down and via notification from down to up. I just tried to use another approach in the infrastructure layer to show another way by using an observer pattern.


## How to build & run the app:
- Inside the VSCode simply hit CTRL + SHIFT + B to run the build command.
- By running this command you can run the application:

```
dotnet watch run
```
