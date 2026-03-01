import React, { useEffect, useState } from "react";
import { MdSave, MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { TbXboxX } from "react-icons/tb";

import "../components/Task.css";
import Button from "../Button";
function Task({ userId, username, setUser, setDetails, user }) {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [editText, setEditText] = useState("");
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchdata() {
      try {
        console.log("loading started");
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/manager/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTasks(data || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log("loading ended");
      }
    }
    const timer = setTimeout(fetchdata, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchText.toLowerCase()),
  );
  const startEdit = (id, currentText) => {
    setEdit(id);
    setEditText(currentText);
  };
  const cancelEdit = () => {
    setEdit(null);
    setEditText("");
  };
  // the mistake i made is inside the useEffect directly call async
  // function but useEffect is syncronous it runs immeatietly so
  // it give me error so i place them in a arrow function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/manager/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: inputValue,
          isComplete: false,
          isEdit: false,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setTasks([...tasks, data.newtask]);
        setInputValue("");
      } else {
        // console.log(data.error);
        setErr(data.message);
        setTimeout(() => {
          setErr("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/manager/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setTasks(tasks.filter((task) => task._id.toString() !== id));
      }
    } catch (error) {}
  };

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/manager/${id}`, {
        method: "PUT",
        body: JSON.stringify({ editText, isEdit: true }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task._id.toString() === id
              ? { ...task, task: data.task, isCompleted: data.isCompleted }
              : task,
          ),
        );
        setEdit(null);
        setEditText("");
      } else {
        // console.log(data.error);
        setErr(data.message);
        setTimeout(() => {
          setErr("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggler = async (id, complete) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/manager/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: complete }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task._id.toString() === id
              ? { ...task, isCompleted: data.isCompleted }
              : task,
          ),
        );
      }
    } catch (error) {
      console.log(error);
      setErr("Oops! Update failed");
    }
  };
  const activeTasks = filteredTasks.filter(
    (task) => task.isCompleted === false,
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.isCompleted === true,
  );
  return (
    <div id="Task_container">
      <header>
        <div className="logo">
          <h1>Task.Ido</h1>
          <p>Take responsibility of your day with US</p>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            setDetails({
              username: "",
              email: "",
              password: "",
            });
          }}
          className="custom_btn"
        >
          logout
        </Button>
      </header>
      {err && (
        <div className="showError">
          <span>{err}</span>
          <button onClick={() => setErr("")}>
            <TbXboxX size={20} />
          </button>
        </div>
      )}
      {/* {console.log(err)} */}
      <main>
        <aside>
          <div className="AddTask">
            <label htmlFor="task">
              <input
                type="text"
                name="task"
                id="task"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add Task here"
              />
            </label>
            <label htmlFor="datetime">
              start time:
              <input
                type="datetime-local"
                name=""
                id="datetime"
              />
            </label>
            <button
              onClick={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  handleSubmit;
                }
              }}
            >
              <MdAdd size={20} />
            </button>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Tasks"
              id="searchTask"
            />
          </div>
        </aside>
        <article className="active_tasks">
          {loading && <h2 style={{ textAlign: "center" }}>Loading....</h2>}
          <div className="greets">
            <h2>{`Welcome ${username}`}</h2>
            <h3>Here are your today to-do list</h3>
          </div>
          {!loading && activeTasks.length === 0 && (
            <h2 style={{ textAlign: "center" }} className="empty_state">
              Task list empty Add Task
            </h2>
          )}
          <div className="tasks_list">
            {activeTasks.map((task) => (
              <div key={task._id}>
                {edit === task._id ? (
                  <div className="tasks">
                    <label htmlFor="updatedtext" className="task_single">
                      <input
                        type="text"
                        name="updatedtext"
                        id="updatedtext"
                        value={editText}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: "1rem",
                          outline: "none",
                        }}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </label>
                    <div>
                      <button onClick={() => handleEdit(task._id)}>
                        <MdSave size={20} />
                      </button>
                      <button onClick={cancelEdit}>
                        <TbXboxX size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="tasks">
                    <label
                      htmlFor={`checked_task${task._id}`}
                      className="task_single"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id={`checked_task${task._id}`}
                        onChange={() =>
                          handleToggler(task._id, task.isCompleted)
                        }
                        checked={task.isCompleted}
                      />
                      <span>{task.task}</span>
                    </label>
                    <div>
                      <button
                        onClick={() => {
                          startEdit(task._id, task.task);
                        }}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(task._id);
                        }}
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
        <article className="completed_tasks">
          {!loading ? (
            <>
              <div className="greets">
                <h2>Today's Completed Tasks list</h2>
                <h3>Finished tasks listed here</h3>
              </div>
              {!loading && completedTasks.length === 0 && (
                <h2 style={{ textAlign: "center" }} className="empty_state">
                  Task list empty Add Task
                </h2>
              )}
              <div className="tasks_list">
                {completedTasks.map((task) => (
                  <div key={task._id}>
                    {edit === task._id ? (
                      <div className="tasks">
                        {" "}
                        <label htmlFor="updatedtext">
                          <input
                            type="text"
                            name="updatedtext"
                            id="updatedtext"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{
                              border: "none",
                              background: "transparent",
                              fontSize: "1rem",
                              outline: "none",
                            }}
                          />
                        </label>
                        <div>
                          <button onClick={() => handleEdit(task._id)}>
                            <MdSave size={20} />
                          </button>
                          <button onClick={cancelEdit}>
                            <TbXboxX size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="tasks">
                        <label
                          htmlFor={`checked_task${task._id}`}
                          className="task_single"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id={`checked_task${task._id}`}
                            onChange={() =>
                              handleToggler(task._id, task.isCompleted)
                            }
                            checked={task.isCompleted}
                          />
                          <span
                            style={{
                              textDecoration: task.isCompleted
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.task}
                          </span>
                        </label>
                        <div>
                          <button
                            onClick={() => {
                              startEdit(task._id, task.task);
                            }}
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(task._id);
                            }}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </article>
      </main>
    </div>
  );
}

export default Task;
