// import express from 'express';
// import http from 'http';
// import mongoose from 'mongoose';
// import { config } from './config/config'
// import authorRoutes from './routes/author'
// // import logging from './library/logging';
// // import { log } from 'console';

// const router = express();

// mongoose.connect(config.mongo.url)
//     try {
//         // logging.info('connected well');
//         console.log('connected ');
//         // StartServer();
        
//     } catch (error) {
//         // logging.error("unable to connect");
//         // logging.error(error);
//         console.log("unable to connect");
// }

// //only start server if mongo is connected
// const StartServer = () => {
//     router.use((req, res, next) => {         //logging the request
//         console.log(`Incoming request --> Methode: [${req.method}] - url:[${req.url}] - IP: ${req.socket.remoteAddress}`);

//         res.on('finish', () => {     //logging the response
//             console.log(`Incoming request --> Methode: [${req.method}] - Url:[${req.url}] - IP: ${req.socket.remoteAddress} - Status: [${req.statusCode}]`);
            
//         });
//         next();
//     });
//     router.use(express.urlencoded({ extended: true }));
//   router.use(express.json());
  
//     // Rules for the API
// router.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'origin, x-requested with, Content-Type, Accept, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// })
//     // routes
//   router.use('/author', authorRoutes)
  
//     //Health Check
//     router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

//     // Error Handling
//     router.use((req, res, next) => {
//         const error = new Error('not found');
//         console.log(error);

//         return res.status(404).json({ message: error.message })
//     });
    
//     http.createServer(router).listen(config.server.port, () => console.log(`server is running on port ${config.server.port}.`));
//     StartServer();
// };



import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import authorRoutes from './routes/author'
import bookRoutes from './routes/book'
import cors from 'cors';


const router = express();
router.use(cors());

// // Enable CORS with custom options
// const corsOptions = {
//   origin: 'http://localhost:6009  or an IP address', // Replace with the origin(s) you want to allow
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Allow cookies and authentication headers to be sent
// };
// router.use(cors(corsOptions));


mongoose.connect(config.mongo.url).then(() => {
  console.log('Connected to MongoDB');
  // Only start the server if MongoDB is connected
  StartServer();
}).catch(error => {
  console.error('Unable to connect to MongoDB:', error);
});

// Define the StartServer function
const StartServer = () => {
  router.use((req, res, next) => {
    // Logging the request
    console.log(`Incoming request --> Method: [${req.method}] - URL: [${req.url}] - IP: ${req.socket.remoteAddress}`);

    res.on('finish', () => {
      // Logging the response
      console.log(`Outgoing response --> Method: [${req.method}] - URL: [${req.url}] - IP: ${req.socket.remoteAddress} - Status: [${res.statusCode}]`);
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // Rules for the API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  //routes
  router.use('/author', authorRoutes)
  router.use('/book', bookRoutes)
  // Health Check
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  // Error Handling 
  router.use((req, res, next) => {
    const error = new Error('Not found');
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}.`));
};



