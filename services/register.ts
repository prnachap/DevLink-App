import { MESSAGES } from "@/constants/constant";
import { END_POINTS } from "@/constants/endpoints";
import { IUser } from "@/models/user.model";
import axios from "axios";

export const registerUser = async (body: Partial<IUser>) => {
  try {
    const { status } = await axios.post<{ email: string }>(
      END_POINTS.REGISTER_USER,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { status, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response?.data as string,
      };
    }
    return { error: MESSAGES.REGISTER_UNSUCCESSFUL, status: 500 };
  }
};
