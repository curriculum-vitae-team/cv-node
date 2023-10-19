import { join } from "path";
import { GraphQLDefinitionsFactory } from "@nestjs/graphql";

new GraphQLDefinitionsFactory().generate({
  typePaths: ["./src/**/*.graphql"],
  path: join(process.cwd(), "src/graphql/index.d.ts"),
});
