import { gql } from "apollo-server-express";

export default gql`
  type Event {
    id: String!
    title: String!
    description: String!
    location: String!
    date: String!
    comments: Comment
    location: [Float!]
  }

  type Query {
    getEventById(id: string!): QueryResponse!
    getEventByTitle(title:string!): GetMultipleEvents!
    getAllEvents: GetMultipleEvents!
    getEventsBasedOnAUser(username?:string, id: string): GetMultipleEvents!
    getEventsInAnArea(): GetMultipleEvents!
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
      events: [Event!]
      errors: [Error!]
  }

  input UpdateInput {
    title: String
    description: String
    location: String
    date: String
    location: [Float!]
  }

  type Mutation {
      createEvent(title: String!, description: String!, date: String!, location: [Float!]): MutationResponse!
      updateEvent(updateObj: UpdateInput!): MutationResponse!
      deleteEvent(eventId: String!): MutationResponse!
      addComment(comment: string!): MutationResponse!
  }
`;
