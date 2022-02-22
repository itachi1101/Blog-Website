import "./write.css";
import { FaPlusCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import {useHistory} from 'react-router-dom'
export default function WritePage() {
  const titleRef = useRef();
  const history=useHistory()
  const descRef = useRef();
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createPost", {
        title: titleRef.current.value,
        description: descRef.current.value,
        username: user.user.username,
      })
      .then(history.push('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="write" style={{ marginTop: "60px" }}>
      <img className="writeImg" alt="" />

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FaPlusCircle style={{ fontSize: "35px" }} />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            ref={descRef}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
