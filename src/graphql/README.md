## cv-node generated types

### Playground

https://cv-project-js.inno.ws/api/graphql

### Query

Write GraphQL query

```ts
import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;
```

Create query arguments and response types

```ts
import type { AuthInput, AuthResult } from "cv-graphql";

export type LoginArgs = {
  auth: AuthInput;
};

export type LoginResult = {
  login: AuthResult;
};
```

Create login hook

```ts
export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
```

### Mutation

Write GraphQL mutation

```ts
import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;
```

Create mutation arguments and response types

```ts
import type { AuthInput, AuthResult } from "cv-graphql";

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};
```

Create signup hook

```ts
export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP);
};
```
