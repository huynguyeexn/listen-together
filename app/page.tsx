"use client";
import Image from "next/image";
import Link from "next/link";
import { Children, LegacyRef, useEffect, useRef, useState } from "react";
import YouTube, { type YouTubeProps, type YouTubePlayer } from "react-youtube";

const getNextVideoId = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("AdbrfoxiAtk");
    }, 1000)
  );
};

export default function Home() {
  // const [url, setUrl] = useState("");
  const videoId = useRef("1O0yazhqaxs");
  const playerRef = useRef<LegacyRef<YouTube> | undefined>();
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    videoId.current = "1O0yazhqaxs";
  }, []);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    console.log(playerRef);

    event.target.mute();
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

    // ended
    if (currentState == 0) {
      console.log(currentState);
      const response = await getNextVideoId();
      videoId.current = response as string;
      player.loadVideoById(videoId.current);
    }

    // playing
    if (currentState == 1) {
      console.log(player);
    }

    // paused
    if (currentState == 2) {
      console.log(player.playVideo());
    }
  };

  const handleMuteCLick = () => {
    // playerRef.current?.unmute();
    console.log(playerRef.current);

    if (!playerRef.current) return;

    const youtube = playerRef.current as unknown as YouTube;
    const player = youtube.getInternalPlayer();

    if (isMute) {
      setIsMute(false);
      player.unMute();
    } else {
      setIsMute(true);
      player.mute();
    }
  };

  return (
    <div className="container h-screen w-full flex justify-center items-center mx-auto ">
      <div className="grid grid-cols-12 w-full gap-8  p-8 rounded-3xl subpixel-antialiased  justify-between bg-background/30 backdrop-blur backdrop-saturate-150">
        <div className="playlist-wrapper col-span-8 flex flex-col gap-4">
          <form className="flex gap-4">
            <input
              className="w-full bg-stone-900 py-2 px-4 rounded-2xl focus:ring-0 focus:border-0"
              type="text"
              placeholder="Add new to list (Youtube URL)"
              name=""
              id=""
            />
            <div className="button-wrapper">
              <button className="button" type="button">
                Add
              </button>
              <div className="button-bg"></div>
            </div>
            <div className="button-wrapper">
              <button
                className="button"
                type="button"
                onClick={handleMuteCLick}
              >
                {isMute ? "Unmute" : "Mute"}
              </button>
              <div className="button-bg"></div>
            </div>
          </form>
          <ul className="bg-stone-900 rounded-2xl p-4 max-h-[70dvh] overflow-scroll">
            {Children.toArray(
              [...Array(20)].map((v, i) => (
                <li>
                  <div className="item border-b border-stone-800 px-2 py-4 flex gap-8 items-center justify-between">
                    <div className="info flex items-center gap-4">
                      <span>{i}</span>
                      <div className="thumb w-36 rounded overflow-hidden">
                        <Image
                          height={90}
                          width={160}
                          className="aspect-video"
                          src={`https://picsum.photos/id/${i}/100/50`}
                          alt="thumb"
                        />
                      </div>
                      <span className="line-clamp-1 hover:text-pink-800">
                        <Link href={"youtube.com"}>
                          Top 20 songs of TheFatRat 2020 - TheFatRat Mega Mix
                          songs of The Fat Rat 2020 - TheFatRat Mega Mix songs
                          of TheFatRat 2020 - TheFatRat Mega Mix
                        </Link>
                      </span>
                    </div>
                    <div className="">3:45</div>
                    <div className="action flex items-center justify-end gap-2">
                      <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg hover:bg-pink-600">
                        1 <span>🗑</span>
                      </button>
                      <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg hover:bg-pink-600">
                        1 <span>👎</span>
                      </button>
                      <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg hover:bg-pink-600">
                        1 <span>👍</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="player-wrapper col-span-4 flex flex-col gap-4 justify-between">
          <div className="player rounded-2xl overflow-hidden w-full aspect-video bg-black">
            <YouTube
              className="aspect-video w-full h-full pointer-events-auto"
              videoId={videoId.current}
              ref={playerRef as LegacyRef<YouTube>}
              style={{
                height: "100%",
                width: "100%",
              }}
              opts={{
                borderRadius: "2rem",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  disablekb: 0,
                  showinfo: 0,
                },
              }}
              iframeClassName=" w-full h-full pointer-events-auto"
              onStateChange={onStateChange}
              onReady={onPlayerReady}
            />
          </div>
          {/* <div>Profile</div> */}
        </div>
      </div>
    </div>
  );
}
