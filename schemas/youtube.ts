import { isValidYoutubeURL, youtubeGetInfoByID } from "@/utils/func";

const key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";

export const YoutubeSchema = {
  getVideoInfo: async (videoUrl: string) => {
    const id = isValidYoutubeURL(videoUrl);

    if (!id) {
      throw new Error("Invalid Youtube Video URL");
    }

    return await fetch(youtubeGetInfoByID(id, key)).then(async (res) => {
      return await res.json();
    });
  },
};
