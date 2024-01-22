module.exports = ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  "users-permissions": {
    config: {
      register: {
        // put the name of your added fields here
        allowedFields: ["firstName", "lastName"],
      },
    },
  },
});
