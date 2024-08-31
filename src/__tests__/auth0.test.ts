import Auth0Manager from "../auth0/Auth0Manager";
import { SpotifyUserData } from "../spotify/spotifyTypes";
import { auth0TestInformation } from "./testSampleData";

describe("Authenication Testing", () => {
  describe("Auth0", () => {
    let auth0Manager: Auth0Manager;
    beforeAll(() => {
      auth0Manager = new Auth0Manager();
    });

    test("All instances should be the same", () => {
      const auth0Manager2: Auth0Manager = new Auth0Manager();
      expect(auth0Manager === auth0Manager2);
    });

    test("Initialising the Auth0Manager should make access token available", async () => {
      await auth0Manager.initialise();
      expect(auth0Manager.accessToken).toBeTruthy();
    });

    test("Should be able to retrieve a test users data", async () => {
      const userData: SpotifyUserData | unknown =
        await auth0Manager.fetchUserData(auth0TestInformation.auth0ID);
      expect(userData).toStrictEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          displayName: expect.any(String),
          image: expect.any(String),
          spotifyID: expect.any(String),
        })
      );
    });

    test("Invalid UserID should return an error", async () => {
      try {
        const userData: SpotifyUserData | unknown =
          await auth0Manager.fetchUserData("123213");

        expect(userData).toBeFalsy();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
