// importing gql, and exporting the query
import { gql } from "@apollo/client";
// Using argument of login to filter, then pass it to user query.
// setting query and providing max repos
// Then use node inside repositories to provide list of items with specific identifiers
// We use nodes because Github returns lists as connections:
// repositories {
//   totalCount
//   nodes: [...]
//   edges: [...]
// }
export const GET_USER = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      bio
      url
      repositories(first: 100) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          languages(first: 5) {
            edges {
              node {
                name
              }
              size
            }
          }
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;
