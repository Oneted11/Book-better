const resolvers = {
  Query: {
    hello: () => {
      return "ho ho ho , hi there and a merry day to you";
    },
    books: () => {
      await.collection.find({}).toArray();
    },
  },
  Mutation: {
    createBook: async (parent, args, context, info) => {
      console.log(":we got to resolver");
      const newBook = await context.database
        .collection("books")
        .create({ data: { name: args.name } });
      return newBook;
    },
  },
};
module.exports=resolvers
