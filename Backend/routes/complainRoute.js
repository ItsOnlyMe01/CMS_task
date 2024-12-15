const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const { sendEmail } = require("../services/mailservice");
const User = require("../models/userSchema");

//getting admin details
const getAdminEmail = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    throw new Error("Admin not found in the database.");
  }
  return admin.email;
};

// saving complaint and sending email of complaint request
router.post("/", async (req, res) => {
  const { title, description, category, priority, user } = req.body;
  console.log(req.body);
  const newComplaint = new Complaint({
    title,
    description,
    category,
    priority,
    user,
  });
  try {
    const savedComplaint = await newComplaint.save();

    console.log(savedComplaint);

    const adminEmail = await getAdminEmail();
    sendEmail(
      `New Complaint: ${savedComplaint.title}`,
      `
      A new complaint has been submitted:
      Title: ${savedComplaint.title}
      Category: ${savedComplaint.category}
      Priority: ${savedComplaint.priority}
      Description: ${savedComplaint.description}
      arisedBy: ${user.name}
    `,
      adminEmail
    );
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//upadte complaints with email
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user");
    sendEmail(
      `Complaint Status Updated: ${updatedComplaint.title}`,
      `
      The status of complaint "${updatedComplaint.title}" has been updated to: ${updatedComplaint.status}.
    `,
      updatedComplaint.user.email
    );
    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete complaint
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
