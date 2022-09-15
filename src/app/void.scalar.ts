import { GraphQLScalarType } from "graphql";

export const Void = new GraphQLScalarType({
  name: "Void",

  description: "The `Void` scalar type represents a null variable.",

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});
