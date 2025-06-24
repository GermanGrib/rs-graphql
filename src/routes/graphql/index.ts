import depthLimit from 'graphql-depth-limit';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, specifiedRules, validate } from 'graphql';
import { schema } from './schema.js';
import { createLoaders } from './dataloaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const validationRules = [...specifiedRules, depthLimit(5)];
      const validationErrors = validate(schema, parse(query), validationRules);
      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      const loaders = createLoaders(fastify.prisma);

      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, loaders },
      }).then((result) => ({
        data: result.data,
        errors: result.errors?.map((err) => ({
          message: err.message,
          locations: err.locations,
          path: err.path,
        })),
      }));
    },
  });
};

export default plugin;
