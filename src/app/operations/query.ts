import gql from 'graphql-tag';

//first query
const getUsers=gql`
query{
  users{
  id
  name
  lastname
  email
  password
  registerDate
  }
}
`;


//second query
const login=gql`
query postLogin($email:String!,$password:String!){
  login(email:$email,password:$password){
    status
    message
    token
  }
}
`;

//three query
const me=gql`
query{
  me{
     status
     message
     user{
       id
       name
       lastname
       email
       password
       registerDate
     }
  }
}
`;

export {
    getUsers,
    login,
    me
}