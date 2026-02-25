const Contact = require('../models/Contact');

// Create new contact inquiry
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, requirements } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !requirements) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new contact inquiry
    const contact = new Contact({ name, email, phone, requirements });
    await contact.save();

    res.status(201).json({ 
      message: 'Contact inquiry submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        requirements: contact.requirements,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contact inquiries (for admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact status updated', contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete contact inquiry
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
