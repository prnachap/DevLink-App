const isLocal = true;
const prodBaseUrl = "";
const localBaseUrl = "http://localhost:3000";

const baseUrl = isLocal ? localBaseUrl : prodBaseUrl;

export const END_POINTS = {
  REGISTER_USER: `${baseUrl}/api/register`,
  PLATFORM: `${baseUrl}/api/platform`,
  LINKS: `${baseUrl}/api/links`,
};
