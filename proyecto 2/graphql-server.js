const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
    type Item {
        id: String
        nombre: String!
        precio: Float!
    }

    type OrderSummary {
        id: ID!
        total: Float!
        estado: String!
    }

    type Query {
        getPizzas: [Item]
        getOrderSummary(orderId: ID!): OrderSummary
    }
`;

const resolvers = {
    Query: {
        getPizzas: async () => {
            const res = await axios.get('http://127.0.0.1:8002/items');
            return res.data;
        },
        getOrderSummary: async (_, { orderId }) => {
            const res = await axios.get(`http://127.0.0.1:8003/orders/${orderId}`);
            return res.data;
        }
    }
};

const app = express();
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(8090, () => console.log("GraphQL Gateway listo en puerto 8090"));
}
startServer();