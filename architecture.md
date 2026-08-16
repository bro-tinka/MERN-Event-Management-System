# EVENT MANAGEMENT SYSTEM

This is my first MERN project .
The project include functionalities below : 

- authentication
- user pass
- backend dev (node.js)
- database connecting ()
- payment support
- CRUD operations
- REST APIs


### High-Level Flow 
```
┌─────────────────────────────────────┐
│          React Frontend             │
│                                     │
│ Pages, Forms, Buttons, UI, State    │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP + JSON
                   ▼
┌─────────────────────────────────────┐
│       Node.js + Express Backend     │
│                                     │
│ Routes                              │
│ Authentication                     │
│ Authorization                      │
│ Tournament Logic                   │
│ Booking Logic                      │
│ Payment Logic                      │
└──────────────────┬──────────────────┘
                   │
                   │ Database queries
                   ▼
┌─────────────────────────────────────┐
│              MongoDB                │
│                                     │
│ Users                               │
│ Tournaments                         │
│ Registrations                       │
│ Payments                            │
│ Notifications                       │
│ Results                             │
└─────────────────────────────────────┘

```

### Tech Stack Flow (MERN)
```
React
   ↓
User-facing application

Express
   ↓
Web/API framework

Node.js
   ↓
JavaScript runtime executing backend code

MongoDB
   ↓
Persistent data storage
```

###### MEANINGS OF EACH TECH STACK

**React** -> handles the user-browser interaction & sending appropriate requests to express.js. It is a Engine for developing & rendering UI , may ask for database  to actually what to develop / show in UI  

**Node.js** -> the javascript runtime (where actually the javascripts run outside the broswer) 

**Express.js** -> Is specifically used to handle API requests & route them to proper destinations in node.js... It is basically used to crate api-end points mostly to prevent our codebase being cumbersome

**MongoDB** -> to have a persistent storgae, even when the server crashes or restarts we have to save our data somewere 
```{ 
  "name": "TOURNAMENT SEASON 1 ",
  "game": "COD",
  "entryFee": 50,
  "maxPlayers": 50,
  "waitingListCapacity": 5
}
```


# BACKEND COMPLETE FLOW :




# FRONTED COMPLETE FLOW:
>React component : it is a javascript written reusable function that returns UI. It may look like html code inside a js, but actually is javascript supporting html basic syntax .  
Example : `App.jsx`



```
Browser loads index.html
   ↓
index.html loads /src/main.jsx
   ↓
main.jsx finds <div id="root">
   ↓
React renders <App />
   ↓
App.jsx decides what appears on screen
```

### Comunication with backend 
the frontend & backend are separate program running on different ports & communicating via HTTP.   
The backend enables communication with the help of `CORS`

```
React sends HTTP request
   ↓
Express receives route
   ↓
Express applies logic
   ↓
MongoDB may be queried
   ↓
Express sends JSON response
   ↓
React updates UI
```



>We have reached a more Deeper level flow on Day 4 you can check out on :
timeline.md/Day4















