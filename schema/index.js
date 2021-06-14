const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');

const { bookQueryFields, bookMutiationFields } = require('./book-type/bookType');
const { authorQueryFields, authorMutationFields } = require('./author-type/authorType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...bookQueryFields,
    ...authorQueryFields,
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...bookMutiationFields,
    ...authorMutationFields,
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
