import React from "react";
import TaskList from "@/components/TaskList";
import CreateTask from "@/components/CreateTask";

const Home = () => {
  return (
    <div className="flex gap-6 w-full">
      <CreateTask />
      <TaskList />
    </div>
  );
};

export default Home;
