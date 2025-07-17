module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS', ['NNhb25UD4Edk58kz3GMp1w==', '3LiXRhK57QgAjVKr9lxwqw==', 'dF40MdSq+ajvPullbcLI2g==', 'Jw8QvB4xKUwC6Fk8OhSqIg==']),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  });
