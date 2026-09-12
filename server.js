const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');
const Pizza = require('./models/pizza');

mongoose.connect('mongodb://localhost:27017/pizzitas');

const typeDefs = gql`
    type Pizza {
        id: ID!
        nombre: String!
        ingredientes: [String]
        precio: Float!
    }

    input PizzaInput {
        nombre: String!
        ingredientes: [String]
        precio: Float!
    }

    type Alert {
        message: String!
    }

    type Query {
        getPizzas: [Pizza]
        getPizza(id: ID!): Pizza
    }

    type Mutation {
        addPizza(input: PizzaInput): Pizza
        updatePizza(id: ID!, input: PizzaInput): Pizza
        delPizza(id: ID!): Alert
    }
`;

const resolvers = {
    Query: {
        async getPizzas(obj) {
            const pizzas = await Pizza.find();
            return pizzas;
        },
        async getPizza(obj, { id }) {
            const pizzabus = await Pizza.findById(id);
            return pizzabus || null;
        }
    },
    Mutation: {
        async addPizza(obj, { input }) {
            const pizza = new Pizza(input);
            await pizza.save();
            return pizza;
        },
        async updatePizza(obj, { id, input }) {
            const pizza = await Pizza.findByIdAndUpdate(id, input, { new: true });
            return pizza;
        },
        async delPizza(obj, { id }) {
            await Pizza.findByIdAndDelete(id);
            return { message: "Pizza eliminada" };
        }
    }
};

const app = express();
app.use(cors());

async function startServer() {
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(8090, function () {
        console.log("GraphQL iniciado en el puerto 8090");
    });
}

startServer();