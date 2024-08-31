type Auth0ManagementResponseBody = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

type Auth0ResponseBody = {
  country: string;
  created_at: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: { spotify: string };
  followers: { href: any; total: number };
  href: string;
  identities: [
    {
      provider: string;
      access_token: string;
      refresh_token: string;
      user_id: string;
      connection: string;
      isSocial: boolean;
    }
  ];
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  nickname: string;
  picture: string;
  product: string;
  type: string;
  updated_at: string;
  uri: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
};

export { Auth0ManagementResponseBody, Auth0ResponseBody };
