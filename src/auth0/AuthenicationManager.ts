import { SpotifyUserData } from "../spotify/spotifyTypes";

abstract class AuthenicationManager {
  private static instance: AuthenicationManager;
  protected isInitialised: boolean = false;
  abstract initialise(): Promise<void>;
  abstract fetchUserData(userID: string): Promise<unknown>;
  constructor() {
    if (!AuthenicationManager.instance) AuthenicationManager.instance = this;
    return AuthenicationManager.instance;
  }
}

export default AuthenicationManager;
