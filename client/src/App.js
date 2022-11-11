import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [item, setItem] = useState([]);
  const [data, setData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addtask", { todo: data })
      .then((res) => setItem(res.data));
    setData("");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/gettask").then((res) => setItem(res.data));
  }, []);
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => setItem(res.data));
  };
  return (
    <div className="d-flex flex-col justify-content-center p-5">
      <div className="card shadow ">
        <div className="card-body">
          <h5 className="card-title">Todo Management Application</h5>
          <form onSubmit={submitHandler}>
            <input
              size="30"
              type="text"
              
              onChange={(e) => setData(e.target.value)}
            />{" "}
            &nbsp;&nbsp;
            <input type="submit" value="Add" name="Add" />
          </form>

          <div>
            {item.map((task) => (
              <div key={task._id}>
                <h5>
                  {task.todo} &nbsp;
                  <button
                    className="p-1"
                    onClick={() => deleteHandler(task._id)}
                  >
                    Delete
                  </button>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
