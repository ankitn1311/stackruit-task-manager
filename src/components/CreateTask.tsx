import { Button } from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";
import { useEditTask } from "@/hooks/state/useEditTask";
import { CustomToast } from "@/utils/CustomToast";
import { firestore } from "@/utils/firebase";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const CreateTask = () => {
  /** Form state could be handled with useFormHook to make it lot better */
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [editTask, setEditTask] = useEditTask();
  const [currentUser] = useCurrentUser();

  const validate = () => {
    if (taskName.length === 0 || description.length === 0) {
      CustomToast.info({
        content: "Please enter all the fields",
      });
      return false;
    }
    return true;
  };

  const createTask = async () => {
    if (!validate()) return;
    setAdding(true);
    try {
      const taskRef = doc(collection(firestore, "tasks"));
      await setDoc(taskRef, {
        name: taskName,
        description,
        completed: false,
        id: taskRef.id,
        user: currentUser,
      });
      CustomToast.success({
        content: "Task created successfully",
      });
    } catch (error: any) {
      CustomToast.error({
        content: error.message,
      });
    } finally {
      setTaskName("");
      setDescription("");
      setAdding(false);
    }
  };

  const editSelectedTask = async () => {
    if (!validate()) return;
    setAdding(true);
    try {
      const taskRef = doc(firestore, "tasks", editTask?.id!);
      await updateDoc(taskRef, {
        ...editTask,
        name: taskName,
        description,
      });
      CustomToast.success({
        content: "Task updated successfully",
      });
    } catch (error: any) {
      CustomToast.error({
        content: error.message,
      });
    } finally {
      setTaskName("");
      setDescription("");
      setAdding(false);
      setEditTask(null);
    }
  };

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.name);
      setDescription(editTask.description);
    }
  }, [editTask]);

  return (
    <div className="flex flex-col gap-4 flex-1 ">
      <div className="uppercase text-lg">
        {!!editTask ? "Edit Task" : "Create Task"}
      </div>
      <Input
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
        label="Task name"
      />

      <TextArea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        label="Description"
      />

      {!!editTask ? (
        <Button onClick={editSelectedTask} disabled={adding}>
          {adding ? "Updating..." : "Update"}
        </Button>
      ) : (
        <Button onClick={createTask} disabled={adding}>
          {adding ? "Creating..." : "Create"}
        </Button>
      )}
    </div>
  );
};

export default CreateTask;
