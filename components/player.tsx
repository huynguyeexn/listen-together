"use client";
import useApplicationStore from "@/utils/zustand/store";
import { ChangeEventHandler, LegacyRef, useEffect, useRef } from "react";
import YouTube, {
  YouTubeEvent,
  type YouTubePlayer,
  type YouTubeProps,
} from "react-youtube";
import { mutate } from "swr";

const getNextVideoId = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("AdbrfoxiAtk");
    }, 1000)
  );
};

export default function PlayerComponent() {
  const { videoPlaying, setVideoPlaying, playlist, volume, setVolume } =
    useApplicationStore();

  const playerRef = useRef<YouTubePlayer | undefined>();
  //
  //
  // ================================================================ //
  useEffect(() => {
    // if (videoPlaying === null) return;
    // if (!playerRef.current) return;
    //
    // const youtube = playerRef.current as unknown as YouTube;
    // const player = youtube.getInternalPlayer() as YouTubePlayer;
    //
    // console.log("playing", videoPlaying);
    //
    // player.loadVideoById(videoPlaying.ytb_id);
    // console.log(player);
    // player.playVideo();
  }, [videoPlaying]);

  //
  // ================================================================ //
  const onPlayerReady: YouTubeProps["onReady"] = (event: YouTubeEvent) => {
    console.log("On player ready", videoPlaying);
    playerRef.current = event.target;

    setVolume(0);
    event.target.setVolume(0);
    event.target.playVideo();
    event.target.seekTo(20);
  };

  const onStateChange: YouTubeProps["onStateChange"] = async (event) => {
    const player = event.target as YouTubePlayer;
    const currentState = event.target.getPlayerState() as Number;
    // access to player in all event handlers via event.target
    // event.target.mute();
    // -1 (unstarted)
    // 0 (ended)
    // 1 (playing)
    // 2 (paused)
    // 3 (buffering)
    // 5 (video cued).

    // console.log(currentState);
    //
    // // ended
    if (currentState == 0) {
      // Remove video playing
      await fetch(`/api/playlist?_id=${videoPlaying?._id}`, {
        method: "DELETE",
      })
        .then(() => {
          setVideoPlaying(null);
          mutate("/api/playlist");
        })
        .catch((e) => {
          console.error(e);

          alert("add failed");
        });

      // console.log(currentState);
      // const response = await getNextVideoId();
      // videoId.current = response as string;
      // player.loadVideoById(videoId.current);
    }
    //
    // // playing
    // if (currentState == 1) {
    //   console.log(player);
    // }
    //
    // // paused
    if (currentState == 2) {
      console.log(player.playVideo());
    }
  };

  const handleChangeVolume: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!playerRef.current) return;
    const newVolume = +e.target.value;
    setVolume(newVolume);

    playerRef.current.unMute();
    playerRef.current.setVolume(newVolume);
  };

  return (
    <>
      <div className="player-wrapper col-span-4 flex flex-col gap-4 justify-start">
        <div className="player rounded-2xl overflow-hidden w-full aspect-video bg-black">
          {videoPlaying !== null ? (
            <YouTube
              className="aspect-video w-full h-full pointer-events-auto"
              videoId={videoPlaying?._id}
              style={{
                height: "100%",
                width: "100%",
              }}
              opts={{
                borderRadius: "2rem",
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  disablekb: 0,
                  showinfo: 0,
                },
              }}
              iframeClassName=" w-full h-full pointer-events-auto"
              onStateChange={onStateChange}
              onReady={onPlayerReady}
            />
          ) : (
            <div>
              <span>Please add video to playlist</span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="">Volume:</div>
          <input
            className="flex-grow"
            type="range"
            value={volume}
            min={0}
            max={100}
            step={1}
            onChange={handleChangeVolume}
          />
          <span className="w-8">{volume}</span>
        </div>
      </div>
    </>
  );
}
