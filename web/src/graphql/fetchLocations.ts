import { gql } from '@apollo/client'

export const fetchBuildings = gql`
  query FetchBuildings {
    buildings {
      id
      name
    }
  }
`

export const fetchLocation = gql`
  query FetchLocation($buildingID: Int!) {
    building(buildingID: $buildingID) {
      locations {
        id
        room
      }
    }
  }
`
