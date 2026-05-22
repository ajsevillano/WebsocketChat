# WebSocket Chat

> A real-time chat application built with Node.js, Express, and Socket.IO. Users can join with a username, chat in a shared room, and see live typing indicators and connection updates.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Features

- Real-time messaging via WebSockets
- Live user count in the chat room
- Join and leave notifications
- Typing indicator broadcast to all users
- XSS protection on messages (via `ent`)

## Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Open `http://localhost:3000` in your browser, enter a username, and start chatting.

## Tech Stack

- Node.js + Express
- Socket.IO v2
- `ent` for HTML entity encoding (XSS protection)
