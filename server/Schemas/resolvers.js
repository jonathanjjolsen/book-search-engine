const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user with this email found!');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
          try{
            const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
          } catch (err) {
            //console.log to see what error is
            //I left it in on purpose because it was so helpful in the development process
            //It enabled me to what was wrong with my heroku deployment, and why it was not adding a user
            console.log(err);
            throw err;
          }
        },
        saveBook: async (parent, { input }, context) => {
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id},
              {
                $addToSet: { savedBooks: input},
              },
              {
                new: true,
                runValidators: true 
              }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      },
};

module.exports = resolvers;
