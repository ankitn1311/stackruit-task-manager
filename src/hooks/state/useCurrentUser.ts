import { atom, useAtom } from "jotai";

const currentUserAtom = atom<string | null>(null);

export const useCurrentUser = () => {
  return useAtom(currentUserAtom);
};
