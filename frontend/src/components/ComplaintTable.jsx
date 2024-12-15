import "../../public/complaintTable.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [visibleDescription, setVisibleDescription] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/api/complaints/${id}`, { status });
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/complaints/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const toggleDescription = (id) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  return (
    <div>
      <h2>Complaint List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <React.Fragment key={complaint._id}>
              <tr>
                <td>{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>{complaint.priority}</td>
                <td>
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusUpdate(complaint._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => toggleDescription(complaint._id)}>
                    {visibleDescription === complaint._id
                      ? "Hide Description"
                      : "View Description"}
                  </button>
                  <button onClick={() => handleDelete(complaint._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              {visibleDescription === complaint._id && (
                <tr>
                  <td colSpan="5" style={{ backgroundColor: "#f9f9f9" }}>
                    <strong>Description:</strong> {complaint.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
