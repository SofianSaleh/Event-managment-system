import { gql } from "apollo-server-express";

export default gql`
  type Error {
    path: String!
    msg: String!
  }
`;
