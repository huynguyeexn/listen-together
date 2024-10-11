"use client";
import InputVideoUrlComponent from "@/components/input";
import PlayerComponent from "@/components/player";
import PlaylistComponent from "@/components/playlist";
import { type Tables } from "@/database.types";
import useApplicationStore from "@/utils/zustand/store";
import { useEffect } from "react";
import useSWR from "swr";

export default function Home() {
  const { setPlaylist, videoPlaying, setVideoPlaying } = useApplicationStore();

  const { data, error } = useSWR<Tables<"playlist">[]>("/api/playlist", {
    refreshInterval: 3000,
  });

  useEffect(() => {
    if (error) {
      console.error("GET PLAYLIST FAILED: ", error);
      return;
    }

    if (data && data.length) {
      setPlaylist(data);

      if (videoPlaying === null) {
        setVideoPlaying(data[0]);
      }
      return;
    }

    setPlaylist([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <div className="container h-screen w-full flex justify-center items-center mx-auto ">
      <div className="grid grid-cols-12 w-full gap-8  p-8 rounded-3xl subpixel-antialiased  justify-between bg-background/30 backdrop-blur backdrop-saturate-150">
        <div className="playlist-wrapper col-span-8 flex flex-col gap-4 relative after:w-full after:absolute after:bottom-0 after:h-10 after:bg-gradient-to-t after:from-stone-900 after:via-80% after:via-stone-900/50 after:to-transparent after:pointer-events-none">
          <InputVideoUrlComponent />
          <PlaylistComponent />
        </div>
        <PlayerComponent />
      </div>
    </div>
  );
}
