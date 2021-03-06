import { gql } from "apollo-server-express";

export default gql`
  type Event {
    id: String!
    title: String!
    description: String!
    date: String!
    comments: [Comment!]
    location: [Float!]
  }

  type Query {
    getEvent(id: String!): QueryResponse!
    searchEvent(searchTerm: String!): GetMultipleEvents!
    getAllEvents: GetMultipleEvents!
    getEventsBasedOnAUser(username: String, id: String): GetMultipleEvents!
    getEventsInAnArea: GetMultipleEvents!
  }

  type QueryResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  type GetMultipleEvents {
    success: Boolean!
    events: [Event!]
    errors: [Error!]
  }

  type MutationResponse {
    success: Boolean!
    event: Event
    errors: [Error!]
  }

  input UpdateInput {
    title: String
    description: String
    date: String
    location: [Float!]
  }

  type Mutation {
    createEvent(
      title: String!
      description: String!
      date: String!
      location: [Float!]
    ): MutationResponse!
    updateEvent(id: String!, updateObj: UpdateInput!): MutationResponse!
    deleteEvent(eventId: String!): MutationResponse!
  }
`;
