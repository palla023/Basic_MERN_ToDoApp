import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [item, setItem] = useState([]);
  const [data, setData] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data !== "") {
      await axios
        .post("http://localhost:5000/addtask", { todo: data })
        .then((res) => {
          setItem(res.data);
          setData(""); // Clear input field after successful submission
        });
    } else {
      alert("Please Enter your task");
    }
  };



  useEffect(() => {
    axios.get("http://localhost:5000/gettask").then((res) => setItem(res.data));
  }, []);

  const deleteHandler =async (id) => {
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => setItem(res.data));
  };

  return (
    <div className="d-flex justify-content-center p-3">
      <div className="card shadow w-100 " style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Todo Management Application</h5>
          <form onSubmit={submitHandler} className="mb-4">
            <div className="d-flex">
              <input
                type="text"
                className="form-control flex-grow-1"
                value={data}
                name="data"
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter your task"
                style={{ minWidth: "0" }} // Allows the input to shrink if needed
              />
              <button type="submit" className="btn btn-primary mx-2">
                Add
              </button>
            </div>
          </form>

          <div className="row g-3">
            {item.map((task) => (
              <div key={task._id} className="col-12 col-md-6 my-2">
                <div className="border p-3 rounded ">
                  <h5 className="d-flex justify-content-between align-items-center px-1">
                    <span style={{ wordBreak: "break-word" }}>{task.todo}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHandler(task._id)}
                    >
                      Delete
                    </button>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;
