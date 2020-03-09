import gql from 'graphql-tag';

const postUser=gql`
mutation postUser($user:UserInput!){
    register(user:$user){
        status
        message
        user{
            id
            name
            lastname
            email
            registerDate
        }
    }
}
`;

export{
    postUser
}