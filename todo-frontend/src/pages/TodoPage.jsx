import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function TodoPage() {
  const [newTask, setNewTask] = useState("");
  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(newTask);
  };
  const handleEditTask = () => {
    console.log("edit");
  };
  const handleLogout = () => {
    console.log("signout");
  };
  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">TODO List</h1>
        <div className="d-flex align-items-center">
          <span className="me-3">
            {/* Logged in as: <strong>{username}</strong> */}
          </span>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </header>

      <Form onSubmit={handleAddTask} className="d-flex mb-3">
        <Form.Control
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          placeholder="Enter a new task"
          required
        />
        <Button type="submit" className="ms-2 btn-success">
          Add Task
        </Button>
      </Form>

      <Modal onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" onChange={() => {}} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
