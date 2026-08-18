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




# BACKEND COMPLETE FLOW :

```
  ENTER             (a req from frontend/client)
    ↓
server.js           (the main Gateway)
    ↓
Express router      (routes the api calls)
    ↓
Mongoose Model      (has capability to directlly talk to Database)
    ↓
Database            (the persistent Storage)
    ↓
Mongoose Document   (returns/Responds back)
    ↓
Express             (may send the data to frontend Server Again)
    ↓
  Exit
```


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

#
# DB Design (MongoDB)

Analogy of the NoSQL Database of MongoDB with a typical Relational database is like as :
| Relational/SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary key | `_id` |
| Relationship | References / embedded data |


$$DATABASE$$
Our Database is storage of Collections(Entities)
For example, our database name is : `tournament_db` .
```
tournament_db
│
├── users
├── tournaments
├── registrations
├── payments
├── notifications
└── results
```

## MongoDB ATLAS (connection)
we have used Cloud based database provided by MongoDB & setup the connection string to connect with it you can check backend/.env.example file for a typical example  
```
Atlas Account   (your user account on MongoDB)
   ↓
Project         (workspace)
   ↓    
Cluster         (the actual running mongoDB cloud environment)
   ↓
Database        (there may be many databases in that cluster)
   ↓
Collections     (an entity in a database)
   ↓
Documents       (an instance of an entity)
```

## Relation between Collections 
The created Documents from the schema of a collection are not isolated documents. They are realted to each other and they are referencig each other.  
The following digaram shows the relationship map in the entities(collection) of our database

```
User
 │
 ├── creates ───────────────→ Tournament
 │
 ├── registers through ─────→ Registration
 │                              │
 │                              └── belongs to Tournament
 │
 ├── makes ─────────────────→ Payment
 │                              │
 │                              ├── belongs to Registration
 │                              └── belongs to Tournament
 │
 ├── receives ──────────────→ Notification
 │                              │
 │                              └── may reference Tournament
 │
 └── receives result in ────→ Result
                                │
                                └── belongs to Tournament

```

#
## Building Performance Indices
We have already built some indices for uniqueness in the collection : `Result` & `Registration` to ensure the uniqueness of combinations of 2 entity.
for example, In `Registration.js` we have already:   

```javascript
registrationSchema.index(           
    { user: 1, tournament: 1 },
    { unique: true }
);
```
This ensures there must not be duplicate registration by the same user for a particular tournament.

Now we will also build some indices for performance & faster lookups. However, this takes up additional space. Therefore, We should build these indices wisely!

```javascript
tournamentSchema.index({ creator: 1 });
// creator      → find tournaments created by one creator
tournamentSchema.index({ status: 1 });
// status       → list OPEN tournaments
tournamentSchema.index({ startTime: 1 });
// startTime    → sort/filter upcoming tournaments
tournamentSchema.index({ game: 1, status: 1 });
// game+status  → find OPEN Free Fire/PUBG tournaments
```

```javascript
resultSchema.index({ user: 1 });
// user → show one player's result history
```

```javascript
registrationSchema.index({ tournament: 1, status: 1 });
// tournament+status → count confirmed/waiting players
registrationSchema.index({ user: 1, status: 1 });
// user+status       → show user's active registrations
registrationSchema.index({ paymentStatus: 1 });
// paymentStatus     → find pending/failed registrations
```

```javascript
paymentSchema.index({ user: 1 });
// user               → list user's payments
paymentSchema.index({ tournament: 1 });
// tournament         → admin payment view by tournament
paymentSchema.index({ registration: 1 }, { unique: true });
// registration unique → one main payment record per registration
paymentSchema.index({ status: 1 });
// status             → find pending/failed payments
paymentSchema.index({ providerOrderId: 1 });
// providerOrderId    → verify provider order
paymentSchema.index({ providerPaymentId: 1 });
// providerPaymentId  → check provider payment record
```

```javascript
notificationSchema.index({ user: 1, isRead: 1 });
// user+isRead     → unread inbox count
notificationSchema.index({ user: 1, createdAt: -1 });
// user+createdAt  → latest notifications first
notificationSchema.index({ tournament: 1 });
// tournament      → tournament-related notifications
notificationSchema.index({ type: 1 });
// type            → filter notification category
```





















