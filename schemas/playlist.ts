import { TablesInsert } from "@/database.types";

export const PlaylistSchema = {
  addVideo: async (video: TablesInsert<"playlist">) => {
    const body = JSON.stringify(video);
    return await fetch("/api/playlist", {
      method: "POST",
      body,
    });
  },
};
