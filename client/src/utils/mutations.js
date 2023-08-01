import gql from 'graphql-tag';

//Mutation for logging in a user
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        }
    }
}`;

//Mutation for creating a new user
export const ADD_USER = gql`
MUTATION addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                bookId
                image
                link
                title
                description
            }
        }
        token
    }
}`;

//Mutation for saving a book to profile
export const SAVE_BOOK = gql`
MUTATION saveBook($input: savedBook!) {
    saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }`;

//Mutation for removing a book from profile
export const REMOVE_BOOK = gql`
MUTATION removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }`;
