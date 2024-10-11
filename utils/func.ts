import { Tables } from "@/database.types";

export const REGEX_VALID_YOUTUBE_URL =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

export const isValidYoutubeURL = (url: string) => {
  if (REGEX_VALID_YOUTUBE_URL.test(url)) {
    return getYoutubeID(url);
  }

  return false;
};

export const getYoutubeID = (url: string) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const youtubeGetInfoByID = (id: string, key: string) => {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&key=${key}&id=${id}`;
};

export const parseDurationString = (duration: string | null) => {
  if (duration == null) return "";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (match == null) return "";
  const match02 = match.slice(1).map(function (x) {
    if (x != null) {
      return x.replace(/\D/, "");
    }
  });

  if (match02 == undefined) return "";

  var hours = (parseInt(match02[0] as string) || 0) + ":";
  var minutes = (parseInt(match02[1] as string) || 0) + ":";
  var seconds = parseInt(match02[2] as string) || 0;

  return `${hours}${minutes}${seconds}`;
};
export const playlistSorted = (playlist: Tables<"playlist">[]) => {
  return playlist.sort((a, b) => {
    const sumA = +(a.vote_up || 0) + -(a.vote_down || 0);
    const sumB = +(b.vote_up || 0) + -(b.vote_down || 0);
    return sumA - sumB;
  });
};
