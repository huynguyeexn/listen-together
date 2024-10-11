import { TablesInsert } from "@/database.types";
import { PlaylistSchema } from "@/schemas/playlist";
import { YoutubeSchema } from "@/schemas/youtube";
import { FormEventHandler, useCallback, useState } from "react";
import { mutate } from "swr";

export default function InputVideoUrlComponent() {
  const [inputVideoUrl, setInputVideoUrl] = useState<string>("");

  const handleClickAddVideo: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      try {
        event.preventDefault();

        const videoInfoResponse = await YoutubeSchema.getVideoInfo(
          inputVideoUrl
        );
        const videoInfoList = videoInfoResponse.items;

        if (videoInfoList.length <= 0) {
          alert("Video not found!");
          return;
        }

        const { snippet, contentDetails, id } = videoInfoList[0];

        const payload: TablesInsert<"playlist"> = {
          _id: id,
          duration: contentDetails.duration,
          name: snippet.title,
          thumb: snippet.thumbnails.default.url,
        };

        const result = await PlaylistSchema.addVideo(payload);

        if (result.ok) {
          mutate("/api/playlist");
          setInputVideoUrl("");
        } else {
          const error = await result.json();
          alert(`Can't add video: ${error.message || "none"}`);
        }
      } catch (error) {
        console.error("ADD VIDEO FAILED: ", error);
      }
    },
    [inputVideoUrl]
  );

  return (
    <form className="flex gap-4" onSubmit={handleClickAddVideo}>
      <input
        className="w-full bg-stone-800 py- px-4 rounded-2xl "
        type="url"
        placeholder="Add new to list (Youtube URL)"
        name="url"
        id="url"
        value={inputVideoUrl}
        onChange={(e) => setInputVideoUrl(e.target.value)}
      />
      <div className="button-wrapper">
        <button className="button" type="submit">
          Add
        </button>
        <div className="button-bg"></div>
      </div>
    </form>
  );
}
