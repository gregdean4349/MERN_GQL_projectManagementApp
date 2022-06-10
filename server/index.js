const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()
const schema = require('./schema/schema')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000

// Connect to database entrypoint
const app = express()

// Connect to database
connectDB()

// Cross-Origin Resource Sharing
app.use(cors())

// GraphQL Endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)

// Start server
app.listen(port, console.log(`Server is running on port ${port}`))
