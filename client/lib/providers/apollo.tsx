import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function CustomApolloProvider(props: any) {
  return (
    <>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </>
  );
}
