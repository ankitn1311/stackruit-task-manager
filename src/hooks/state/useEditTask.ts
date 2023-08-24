import { Task } from "@/types";
import { atom, useAtom } from "jotai";

const editTaskAtom = atom<Task | null>(null);

export const useEditTask = () => {
  return useAtom(editTaskAtom);
};
