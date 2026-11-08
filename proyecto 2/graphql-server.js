const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
    type Producto {
        id: ID!
        nombre: String!
        ingredientes: [String!]
        precio: Int!
        imagen: String!
    }

    type ItemPedido {
        productoId: ID
        nombreSnapshot: String!
        precioSnapshot: Int!
        cantidad: Int!
        personalizacion: String
        producto: Producto
    }

    type Pago {
        id: ID!
        monto: Int!
        moneda: String!
        estado: String!
        providerTxId: String
    }

    type Direccion {
        calle: String!
        comuna: String!
        referencia: String
    }

    type Cliente {
        id: ID!
        nombre: String!
        email: String!
        telefono: String
    }

    type ResumenPedido {
        id: ID!
        estado: String!
        total: Int!
        tipoEntrega: String!
        creadoEn: String!
        items: [ItemPedido!]!
        pago: Pago
        direccionEntrega: Direccion
        cliente: Cliente
    }

    type Query {
        catalogo(tipo: String, first: Int = 10, offset: Int = 0): [Producto!]!
        resumenPedido(id: ID!): ResumenPedido
    }
`;

const resolvers = {
    Query: {
        catalogo: async (_, { tipo, first, offset }, context) => {
            try {
                const res = await axios.get('http://127.0.0.1:8002/items', {
                    headers: { 'X-Service-Key': process.env.SERVICE_KEY || 'gql-secret-key' }
                });
                return res.data.map(item => ({ ...item, id: item.id || item._id })).slice(offset, offset + first);
            } catch (error) {
                console.error("Error al obtener catÃ¡logo:", error.message);
                return [];
            }
        },

        resumenPedido: async (_, { id }, context) => {
            const { userId, userRole } = context;
            const headers = {
                'X-User-Id': userId,
                'X-User-Role': userRole,
                'X-Service-Key': process.env.SERVICE_KEY || 'gql-secret-key'
            };

            try {
                const resOrder = await axios.get(`http://127.0.0.1:8003/orders/${id}`, { headers });
                const order = resOrder.data;

                let productosMap = {};
                const productIds = order.items.map(i => i.producto_id).filter(Boolean);
                if (productIds.length > 0) {
                    try {
                        const resInv = await axios.get(`http://127.0.0.1:8002/items?ids=${productIds.join(',')}`, { headers });
                        resInv.data.forEach(prod => {
                            productosMap[prod.id || prod._id] = prod;
                        });
                    } catch (err) {
                        console.warn("Fallo parcial en Inventario, usando datos snapshot:", err.message);
                    }
                }

                let pagoData = null;
                try {
                    const resPago = await axios.get(`http://127.0.0.1:8004/payments/${id}`, { headers });
                    pagoData = resPago.data;
                } catch (err) {
                    pagoData = null;
                }

                const itemsEnriquecidos = order.items.map(item => ({
                    productoId: item.producto_id,
                    nombreSnapshot: item.nombre_snapshot || item.nombre,
                    precioSnapshot: item.precio_snapshot || item.precio,
                    cantidad: item.cantidad,
                    personalizacion: item.personalizacion ? JSON.stringify(item.personalizacion) : null,
                    producto: productosMap[item.producto_id] || null
                }));

                const esAdminOPersonal = ['ADM', 'PER'].includes(userRole);
                const esDuenio = order.cliente_id === userId;

                return {
                    id: order.id || order._id,
                    estado: order.estado,
                    total: order.total,
                    tipoEntrega: order.tipo_entrega,
                    creadoEn: order.creado_en || new Date().toISOString(),
                    items: itemsEnriquecidos,
                    pago: (esDuenio || userRole === 'ADM') ? pagoData : null,
                    direccionEntrega: (esDuenio || esAdminOPersonal) ? order.direccion : null,
                    cliente: esAdminOPersonal ? order.cliente : null
                };
            } catch (error) {
                console.error(`Error resolviendo resumenPedido ${id}:`, error.message);
                throw new Error("No se pudo obtener el resumen del pedido o no tiene permisos.");
            }
        }
    }
};

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            userId: req.headers['x-user-id'] || null,
            userRole: req.headers['x-user-role'] || 'ANON'
        })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(8090, () => console.log("GraphQL Gateway operativo en http://localhost:8090/graphql"));
}

startServer();