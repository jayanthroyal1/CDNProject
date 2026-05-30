# Authentication Session Strategy

Decision:

JWT Access Token
+
Refresh Token
+
Redis Session

Reason:

Scalable
Stateless
Supports CloudFront
Supports Horizontal Scaling

Alternatives Rejected:

Database Sessions
LocalStorage Tokens