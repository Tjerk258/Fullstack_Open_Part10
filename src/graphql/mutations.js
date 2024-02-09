import { gql } from '@apollo/client';

export const LOG_IN = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
  }
}
`;

export const NEW_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    userId
    createdAt
    rating
    text
    repositoryId
  }
}
`

export const NEW_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
    id
  }
}
`;

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`