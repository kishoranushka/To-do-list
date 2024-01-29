import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./db/firebase";

const App = () => {
  const [newTask, setNewTask] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const readData = async () => {
      const collectionRef = collection(db, "task");
      const querySnapshot = await getDocs(collectionRef);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewTask(tasks);
    };

    readData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "task"), {
        task: data,
      });

      const newTaskData = { id: docRef.id, task: data };
      setNewTask((prevTasks) => [newTaskData, ...prevTasks]);
      setData("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "task", taskId));
      setNewTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-gray-800">
        <div className="text-center w-full h-full md:w-96 md:h-96   bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl overflow-auto">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="border border-black rounded mt-6 p-2 mb-5 mr-5"
              required
              type="text"
              placeholder="Enter your task..."
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            <button
              className="border border-black rounded p-2 bg-white"
              type="Submit"
            >
              +
            </button>
          </form>

          <div>
            {newTask.map((task) => (
              <p key={task.id}>
                {task.task}{" "}
                <button
                  className="bg-white rounded border border-black p-1 ml-10 px-10 mb-5"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  Delete
                </button>
              </p>
            ))}
            {newTask.length ? (
              ""
            ) : (
              <p className="text-xl font-bold text-left ml-20 text-gray-800">
                No Task Added
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
