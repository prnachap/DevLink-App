import { MESSAGES } from "@/constants/constant";
import { END_POINTS } from "@/constants/endpoints";
import { type CreateLinksListResponse } from "@/global";
import { LinksInput } from "@/schema/links.schema";
import axios from "axios";

export const getLinksList = async () => {
  try {
    const {
      data: { data },
      status,
    } = await axios.get<CreateLinksListResponse>(END_POINTS.LINKS, {
      headers: { "Content-Type": "application/json" },
    });
    return { data, status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.message, status: error.status };
    }
    return { error: MESSAGES.SERVER_API_ERROR, status: 500 };
  }
};

export const createLinksList = async (payload: { linksList: LinksInput }) => {
  try {
    const { data, status } = await axios.post<CreateLinksListResponse>(
      END_POINTS.LINKS,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data, status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.message, status: error.status };
    }
    return { error: MESSAGES.SERVER_API_ERROR, status: 500 };
  }
};
