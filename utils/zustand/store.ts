import { create, useStore } from "zustand";
import { playlistSorted } from "../func";
import { ApplicationStateType } from "./type";

const applicationStore = create<ApplicationStateType>()((set) => ({
  // ------------------------------------------------------- //
  videoPlaying: null,
  setVideoPlaying: (video) => set(() => ({ videoPlaying: video })),
  //

  // ------------------------------------------------------- //
  volume: 0,
  setVolume: (v) => set(() => ({ volume: v })),
  //

  // ------------------------------------------------------- //
  playlist: [],
  setPlaylist: (newPlaylist) =>
    set(() => ({
      playlist: playlistSorted(newPlaylist),
    })),
  addVideoToPlaylist: (video) =>
    set((state) => ({ playlist: playlistSorted([...state.playlist, video]) })),
  //
}));

function useApplicationStore(): ApplicationStateType;
function useApplicationStore<T>(
  selector: (state: ApplicationStateType) => T,
): T;
function useApplicationStore<T>(selector?: (state: ApplicationStateType) => T) {
  return useStore(applicationStore, selector!);
}

export default useApplicationStore;
