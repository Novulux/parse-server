// Helper functions for accessing the okta API.
var OktaJwtVerifier = require('@okta/jwt-verifier');

var oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://' + process.env.OktaDomain + '.com/oauth2/default',
  assertClaims: {
    aud: 'api://default'
  }
});

function validateAuthData(authData) {
  if (authData.access_token) {
    oktaJwtVerifier.verifyAccessToken(authData.access_token)
      .then(jwt => {
      // the token is valid
        return Promise.resolve(jwt.claims);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

// Returns a promise that fulfills if this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
