import { Button } from "@/components/Button";
import { useEditTask } from "@/hooks/state/useEditTask";
import { Task } from "@/types";
import { CustomToast } from "@/utils/CustomToast";
import { firestore } from "@/utils/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Task = ({ task }: { task: Task }) => {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [, setEditTask] = useEditTask();

  const deleteTask = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(firestore, "tasks", task?.id!));
      CustomToast.success({
        content: "Successfully deleted",
      });
      setDeleting(false);
    } catch (err: any) {
      CustomToast.error({
        content: err.message,
      });
      setDeleting(false);
    }
    setDeleting(false);
  };

  const toggleCompletion = async () => {
    setUpdating(true);
    try {
      const updateRef = doc(firestore, "tasks", task?.id!);
      await updateDoc(updateRef, {
        completed: !task?.completed,
      });
      CustomToast.success({
        content: "Status changed",
      });
      setUpdating(false);
    } catch (err: any) {
      CustomToast.error({
        content: err.message,
      });
      setUpdating(false);
    }
    setUpdating(false);
  };

  return (
    <div
      className={`flex flex-col gap-2 border p-4 rounded-md ${
        task.completed && "bg-grey-100"
      } `}>
      <div className="flex flex-col gap-2 flex-1">
        <div className="">Name: {task.name}</div>
        <div className="text-grey-700 text-sm">
          Description: {task.description}
        </div>
        <div>
          Status:{" "}
          {updating ? (
            "Updating..."
          ) : (
            <span
              onClick={() => {
                toggleCompletion();
              }}
              className={`${
                task.completed ? "text-green-500" : "text-orange-500"
              } underline cursor-pointer`}>
              {task.completed ? "Completed" : "Incomplete"}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 flex gap-2 items-center self-end">
        <Button size="sm" variant="primary" onClick={() => setEditTask(task)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          disabled={deleting}
          onClick={() => {
            deleteTask();
          }}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default Task;
