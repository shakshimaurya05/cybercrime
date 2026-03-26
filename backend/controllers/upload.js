const path = require("path");
const fs = require("fs");

// Upload single image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadImage, deleteImage };
