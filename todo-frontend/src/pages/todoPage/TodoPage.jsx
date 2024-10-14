import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  addTask,
  deleteTask,
  fetchTasks,
  handleLogout,
  toggleTaskCompletion,
  handleEditTask,
} from "./controllers/formControllers";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    fetchTasks(setTasks, setError);
  }, []);
  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">
          {" "}
          {username ? username.toUpperCase() : ""} ToDo List{" "}
        </h1>
        <button
          onClick={() => handleLogout(dispatch, navigate, setError)}
          className="btn btn-danger"
        >
          Logout
        </button>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Task Addition Form */}
      <Form
        onSubmit={(e) =>
          addTask(e, newTask, tasks, setTasks, setNewTask, setError)
        }
        className="d-flex mb-3"
      >
        <Form.Control
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          required
        />
        <Button type="submit" className="ms-2 btn-success">
          Add Task
        </Button>
      </Form>

      {/* Task List */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "bg-light text-decoration-line-through" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                className="me-3"
                checked={task.completed}
                onChange={() =>
                  toggleTaskCompletion(task, tasks, setTasks, setError)
                }
              />
              <span>{task.title}</span>
            </div>
            <div>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => {
                  setEditTask(task);
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task._id, tasks, setTasks, setError)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editTask ? editTask.title : ""}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleEditTask(editTask, tasks, setTasks, setShowModal, setError)
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
