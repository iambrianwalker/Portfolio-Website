import { createHmac } from "crypto";
import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = process.env.APP_REGION
  ? new CognitoIdentityProviderClient({ region: process.env.APP_REGION })
  : null;

function getSecretHash(username: string, clientId: string, clientSecret: string) {
  return createHmac("sha256", clientSecret)
    .update(`${username}${clientId}`)
    .digest("base64");
}

function buildAuthParameters(username: string, password: string) {
  const clientId = process.env.COGNITO_USER_POOL_CLIENT_ID!;
  const clientSecret = process.env.COGNITO_USER_POOL_CLIENT_SECRET;

  const authParameters: Record<string, string> = {
    USERNAME: username,
    PASSWORD: password,
  };

  if (clientSecret) {
    authParameters.SECRET_HASH = getSecretHash(username, clientId, clientSecret);
  }

  return authParameters;
}

export async function authenticateWithCognito(username: string, password: string) {
  if (!client || !process.env.COGNITO_USER_POOL_CLIENT_ID) {
    return null;
  }

  try {
    const response = await client.send(
      new InitiateAuthCommand({
        ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: buildAuthParameters(username, password),
      })
    );

    return response.AuthenticationResult ?? null;
  } catch {
    return null;
  }
}

export async function validateCognitoToken(accessToken: string): Promise<boolean> {
  if (!client || !accessToken) {
    return false;
  }

  try {
    await client.send(
      new GetUserCommand({
        AccessToken: accessToken,
      })
    );
    return true;
  } catch {
    return false;
  }
}
