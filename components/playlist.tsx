import { Database } from "@/database.types";
import { parseDurationString } from "@/utils/func";
import useApplicationStore from "@/utils/zustand/store";
import Image from "next/image";
import Link from "next/link";
import { Children, useEffect } from "react";
import useSWR from "swr";

export default function PlaylistComponent() {
  const { playlist } = useApplicationStore();

  return (
    <table>
      <thead className="border-b border-stone-700 text-left">
        <tr>
          <th className="p-4">#</th>
          <th className="p-4">Title</th>
          <th className="p-4">Duration</th>
          <th className="p-4"></th>
        </tr>
      </thead>
      <tbody>
        {playlist.length > 0 &&
          playlist.map((video, index) => (
            <tr key={video._id} className="border-b border-stone-700">
              <td className="p-4">{index}</td>
              <td className="p-4 flex gap-4 items-center">
                <Image
                  src={video.thumb ?? ""}
                  title={video.name || "thumb"}
                  alt={video.name || "thumb"}
                  height={45}
                  width={60}
                  className=""
                />
                <Link
                  href={`https://www.youtube.com/watch?v=${video._id}`}
                  title={video.name || ""}
                  target="_blank"
                  className="line-clamp-1 transition hover:text-pink-600"
                >
                  {video.name}
                </Link>
              </td>
              <td className="p-4">{parseDurationString(video.duration)}</td>
              <td className="p-4">actions</td>
            </tr>
          ))}
      </tbody>
    </table>
    // <ul className=" my-4 max-h-[70dvh] relative overflow-x-hidden overflow-y-scroll ">
    //   {playlist.length > 0 &&
    //     Children.toArray(
    //       playlist.map((v, i) => (
    //         <li>
    //           <div className="item border-b border-stone-800 py-4 flex gap-8 items-center justify-between">
    //             <div className="info flex items-center gap-4">
    //               <span>{i == 0 ? "playing" : i}</span>
    //               <div className="thumb min-w-[60px] max-w-[60px] rounded overflow-hidden">
    //                 <Image
    //                   height={45}
    //                   width={60}
    //                   className="max-h-[40px] w-[60px]"
    //                   src={v.thumb ?? ""}
    //                   alt="thumb"
    //                 />
    //               </div>
    //               <span className="flex-grow">
    //                 <Link
    //                   className="line-clamp-1 transition hover:text-pink-600 "
    //                   target="_blank"
    //                   href={v.ytb_id ?? ""}
    //                   title={v.name ?? ""}
    //                 >
    //                   {v.name}
    //                 </Link>
    //               </span>
    //             </div>
    //             <div className="action flex items-center justify-end gap-2">
    //               <div className="">{parseDurationString(v.duration)}</div>
    //               <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg  transition hover:bg-pink-600">
    //                 {v.vote_remove}
    //                 <span>🗑</span>
    //               </button>
    //               <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg  transition hover:bg-pink-600">
    //                 {v.vote_down}
    //                 <span>👎</span>
    //               </button>
    //               <button className="bg-stone-800 flex flex-row gap-3 px-2 py-1 rounded-lg  transition hover:bg-pink-600">
    //                 {v.vote_up}
    //                 <span>👍</span>
    //               </button>
    //             </div>
    //           </div>
    //         </li>
    //       )),
    //     )}
    // </ul>
  );
}
