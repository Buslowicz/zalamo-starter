import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { createServer } from 'http';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { json } from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';

import * as queryMap from '../persistent-queries.json';
import { invert } from 'lodash';

// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { subscriptionManager } from './data/subscriptions';
import schema from './data/schema';

const GRAPHQL_PORT = 8080;
const WS_PORT = 8090;

const graphQLServer = express().use('*', cors());

graphQLServer.use('/graphql', json(), (req, resp, next) => {
  if (req.body.id) {
    req.body.query = invert(queryMap)[ req.body.id ];
  }
  next();
}, graphqlExpress({
  schema,
  context: {},
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));
