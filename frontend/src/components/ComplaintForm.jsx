import React, { useContext, useState } from "react";
import axios from "axios";
import "../../public/complaintForm.css";
import { ComplaintContext } from "./context/ComplaintProvider";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Product");
  const [priority, setPriority] = useState("Low");

  const { user } = useContext(ComplaintContext);

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      await axios.post("/complaints", {
        title,
        description,
        category,
        priority,
        user,
      });
      alert("Complaint submitted successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Complaint</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Product">Product</option>
        <option value="Service">Service</option>
        <option value="Support">Support</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            value="Low"
            checked={priority === "Low"}
            onChange={() => setPriority("Low")}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            checked={priority === "Medium"}
            onChange={() => setPriority("Medium")}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="High"
            checked={priority === "High"}
            onChange={() => setPriority("High")}
          />
          High
        </label>
      </div>
      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;
