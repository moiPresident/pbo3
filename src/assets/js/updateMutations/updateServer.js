import gql from 'graphql-tag'

export const updateServer = gql`
mutation updateServer ($id: ID!, $hostname: String!, $ip: String!, $infos: String!, $raid: Boolean!, $offer: ID!, $client: ID!, $cred: ID!, $type: ID!, $env: ID!, $dc: ID!, $profile: ID!, $server_user: ID!, $os: ID!, $services: [ID]){
    updateServer(input: {
        where: {
      id: $id
    }
    data: {
      hostname: $hostname
      ip: $ip
      infos: $infos
      raid: $raid
      offer: $offer
      client: $client
      cred: $cred
      type: $type
      env: $env
      dc: $dc
      profile: $profile
      server_user: $server_user
      os: $os
      services: $services
    }
  }) {
    server {
      id
    }
  }
}`