const restify = require('restify');
const server = restify.createServer();

// setting
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const users = {
    1: {
        name: 'Jhon',
        lastName: 'Gomez'
    },
    2: {
        name: 'Richard',
        lastName: 'Batista'
    }

};
let userCount = 2;

// Routes
server.get('/user', (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});
server.get('/user/:id', (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
});

server.post('/user', (req, res, next) => {
   let user = req.body;
   userCount++;
   user.id = userCount;
   users[user.id] = user;
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));

});

server.put('/user/:id', (req, res, next) => {
    const user = users[parseInt(req.params.id)];
    const update = req.body;

    for(let field in update){
        user[field] = update[field];
    }
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));

});

server.del('/user/:id', (req, res, next) => {
    delete users[parseInt(req.params.id)];
    res.setHeader('Content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(true));

});

//Start server
server.listen(3000,() => {
   console.log('server on port 3000');
});