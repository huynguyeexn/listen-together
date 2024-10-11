import { type TablesInsert, type Tables } from "@/database.types";

export type VideoType = Tables<"playlist">;
export type PlaylistType = VideoType[];

export type ApplicationStateType = {
  videoPlaying: VideoType | null;
  setVideoPlaying: (video: VideoType | null) => void;

  volume: number;
  setVolume: (v: number) => void;

  playlist: PlaylistType;
  setPlaylist: (playlist: PlaylistType) => void;
  addVideoToPlaylist: (videoDetail: VideoType) => void;
};
