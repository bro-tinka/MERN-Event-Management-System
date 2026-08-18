Our main folder structure will look like this 

```
custom-room-booking-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   │   └── scripts.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

Again this is for my own Explanation:(what each functionality will do !)

### BACKEND

- **server.js** : this is the starting entry point of the server where everything will begin when js runtime starts

- **config/** : contains necessary startup settings, configurations like which we dont' generally do repeatedly. Like setting up a database connection, enviroment variable loading, etc

- **models/** : will define how the content inside the databse will be stored. It will represent the database structure definition.

- **routes/** : as the name suggests, will handle the different api paths, when this url is hit, what should be done? It's very helpful for organising APIs

- **controllers/** :will contain the exact logic after a routes -> call to the controller. The function & logic that exactly route is refefering to

- **middleware/** : the overall flow from request arriving to exectuion of controller is determined by this. The high level logic or the most of the repittive code is organised here. Thing of it  as Reusable filter checks 

- **utils/** : contains small reusable functions to avoid clutter in server.js 

- **scripts/** : contains developer testing tools for debugging & testing.