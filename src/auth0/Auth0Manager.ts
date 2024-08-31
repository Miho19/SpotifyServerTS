import fetch, { Response } from "node-fetch";
import AuthenicationManager from "./AuthenicationManager";
import { SpotifyUserData } from "../spotify/spotifyTypes";
import { Auth0ManagementResponseBody, Auth0ResponseBody } from "./auth0Types";

class Auth0Manager extends AuthenicationManager {
  private _accessToken: string = "";

  async initialise(): Promise<void> {
    if (this.isInitialised || this._accessToken) return;

    const requestBody: string = `{"client_id":"${process.env.AUTH0CLIENTID}","client_secret":"${process.env.AUTH0CLIENTSECRET}","audience":"${process.env.AUTH0MANAGEMENTDOMAIN}/api/v2/","grant_type":"client_credentials"}`;

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: requestBody,
    };

    try {
      const auth0ManagementResponse: Response = await fetch(
        `${process.env.AUTH0MANAGEMENTDOMAIN}/oauth/token`,
        options
      );

      if (!auth0ManagementResponse.ok)
        throw new Error(auth0ManagementResponse.statusText);

      const body =
        (await auth0ManagementResponse.json()) as Auth0ManagementResponseBody;
      this._accessToken = body.access_token;
      this.isInitialised = true;
    } catch (errors) {
      console.error(errors);
      throw new Error(
        "Auth0 Management System Failed to retrieve access token"
      );
    }
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  async fetchUserData(userID: string) {
    if (!userID) throw new Error("Auth0 requires an userID");
    if (!this.isInitialised) await this.initialise();

    const options = {
      method: "GET",
      headers: { authorization: `Bearer ${this._accessToken}` },
    };

    try {
      const auth0Response: Response = await fetch(
        `${process.env.AUTH0MANAGEMENTDOMAIN}/api/v2/users/${userID}`,
        options
      );

      if (!auth0Response.ok)
        throw new Error("Unable to fetch user data from Auth0");

      const body = (await auth0Response.json()) as Auth0ResponseBody;
      const spotifyUserObject: SpotifyUserData =
        this.auth0ResponseToSpotifyUserObject(body);

      return spotifyUserObject;
    } catch (errors) {}
  }

  private auth0ResponseToSpotifyUserObject(
    auth0Response: Auth0ResponseBody
  ): SpotifyUserData {
    const spotifyID: string = auth0Response?.user_id.split("user:")[1];

    const spotifyUserObject: SpotifyUserData = {
      accessToken: auth0Response.identities[0].access_token,
      displayName: auth0Response.display_name,
      image: auth0Response.images[0].url,
      spotifyID,
    };

    return spotifyUserObject;
  }
}

export default Auth0Manager;
