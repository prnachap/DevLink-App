export const MESSAGES = {
  REGISTER_SUCCESSFUL: "Congratulations! Your registration is complete.",
  REGISTER_UNSUCCESSFUL: "Registration failed. Please try again later.",
  SERVER_API_ERROR: "Something went wrong",
  LOGIN_SUCCESSFUL: "Welcome! You have successfully logged in.",
  SERVER_FAILURE: "Something went wrong",
  LINKS_SAVE_SUCCESSFUL: "Save was successful!",
  LINKS_SAVE_UNSUCCESSFUL: "Unable to save, Please try again!",
  LAST_ITEM_REMOVAL_ERROR:
    "Sorry, you cannot remove the last item. You must have at least one item",
};

export const NAV_LINKS = [
  { href: "/dashboard", name: "dashboard" },
  { href: "/profile", name: "profile details" },
];

export const SVG_COLOR_MAPPER: Record<string, string> = {
  github: "#1A1A1A",
  facebook: "#2442AC",
  linkedin: "#2D68FF",
  gitlab: "#EB4925",
  youtube: "#EE3939",
  freecodecamp: "#302267",
  "frontend mentor": "#FAFAFA",
  twitter: "#43B7E9",
  twitch: "#EE3FC8",
  "dev.to": "#333333",
  codewars: "#8A1A50",
  hashnode: "#0330D1",
  codepen: "#1A1A1A",
  "stack overflow": "#f48024",
};

export const TEXT_COLOR_BASED_ON_PLATFORM: Record<string, string> = {
  frontendmentor: "#000",
};
