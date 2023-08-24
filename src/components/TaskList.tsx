import SingleTask from "@/components/Task";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";
import { Task } from "@/types";
import { firestore } from "@/utils/firebase";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUser] = useCurrentUser();
  const [loading, setLoading] = useState(false);

  let unsubscribe: Unsubscribe;

  const fetchInitialTasks = async () => {
    const q = query(
      collection(firestore, "tasks"),
      where("user", "==", currentUser)
    );
    setLoading(true);
    await new Promise((resolve) => {
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksFromSnapshot: Task[] = [];
        querySnapshot.forEach((doc) => {
          tasksFromSnapshot.push(doc.data() as Task);
        });
        setTasks(tasksFromSnapshot);
        resolve("done");
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialTasks();
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="uppercase text-lg">Tasks</div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <SingleTask task={task} key={task.id} />
          ))}
          {tasks.length === 0 && <div className="text-grey-700">No tasks</div>}
        </div>
      )}
    </div>
  );
};

export default TaskList;
