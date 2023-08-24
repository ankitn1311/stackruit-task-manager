import SingleTask from "@/components/Task";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";
import { Task } from "@/types";
import { firestore } from "@/utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    const q = query(
      collection(firestore, "tasks"),
      where("user", "==", currentUser)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksFromSnapshot: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksFromSnapshot.push(doc.data() as Task);
      });
      setTasks(tasksFromSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="uppercase text-lg">Tasks</div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <SingleTask task={task} key={task.id} />
        ))}
        {tasks.length === 0 && <div className="text-grey-700">No tasks</div>}
      </div>
    </div>
  );
};

export default TaskList;
