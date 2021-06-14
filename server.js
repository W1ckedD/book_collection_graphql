const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');
connectDB();

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  return res.status(200).json({ app: 'Express' });
});

const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () => console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`));
