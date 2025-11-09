import Keycloak from 'keycloak-connect';
import { Request, Response, NextFunction } from 'express';

const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM || 'football-analytics',
  'auth-server-url': process.env.KEYCLOAK_URL || 'http://localhost:8080/auth',
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID || 'analytics-app',
  'confidential-port': 0,
  'bearer-only': true
};

const keycloak = new Keycloak({}, keycloakConfig);

export const authMiddleware = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles && roles.length > 0) {
      return keycloak.protect((token) => {
        return roles.some(role => token.hasRole(role));
      })(req, res, next);
    }
    return keycloak.protect()(req, res, next);
  };
};

export default keycloak;