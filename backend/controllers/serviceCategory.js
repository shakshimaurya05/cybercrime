const ServiceCategory = require('../models/ServiceCategory');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get category by name (e.g., "soc", "vapt")
exports.getCategoryByName = async (req, res) => {
  try {
    const category = await ServiceCategory.findOne({ name: req.params.name, isActive: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, title, shortDescription, detailedDescription, features, image } = req.body;

    if (!name || !title || !shortDescription || !detailedDescription || !features || !image) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if category already exists
    const existing = await ServiceCategory.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = new ServiceCategory({ 
      name, 
      title, 
      shortDescription, 
      detailedDescription, 
      features, 
      image 
    });
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const category = await ServiceCategory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ServiceCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};