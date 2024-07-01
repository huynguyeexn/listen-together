import Image from "next/image";
import Link from "next/link";
import { Children } from "react";

export default function Home() {
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
            <iframe
              style={{
                height: "100%",
                width: "100%",
              }}
              src="https://www.youtube.com/embed/lBb8jI6bS2U?si=dCtqExltdaNdG3YU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
          {/* <div>Profile</div> */}
        </div>
      </div>
    </div>
  );
}
