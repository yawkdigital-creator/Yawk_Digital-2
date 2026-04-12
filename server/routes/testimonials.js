import express from 'express';
import crypto from 'crypto';
import Testimonial from '../models/Testimonial.js';

// Gravatar uses MD5 of the trimmed, lowercase email
function gravatarHash(email) {
  return crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

const router = express.Router();

// POST - Submit a new testimonial (client-facing)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, role, company, rating, content, service } = req.body;

    if (!name || !email || !rating || !content) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, rating and review content are required',
      });
    }

    const testimonial = new Testimonial({
      name,
      email,
      role: role || '',
      company: company || '',
      rating: parseInt(rating),
      content,
      service: service || '',
      avatarHash: gravatarHash(email),
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted and is pending approval.',
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }

    res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
  }
});

// GET - Get all testimonials (admin) — called as /api/testimonials?status=all&limit=100
router.get('/', async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    const query = status && status !== 'all' ? { status } : {};

    const testimonials = await Testimonial.find(query)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Error fetching testimonials' });
  }
});

// GET - Get approved testimonials (public)
router.get('/approved', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ submittedAt: -1 })
      .select('name role company content rating service avatarHash submittedAt');

    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching testimonials' });
  }
});

// PUT - Full edit of a testimonial (admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, role, company, rating, content, service, status } = req.body;

    const updateFields = {};
    if (name    !== undefined) updateFields.name    = name;
    if (role    !== undefined) updateFields.role    = role;
    if (company !== undefined) updateFields.company = company;
    if (rating  !== undefined) updateFields.rating  = parseInt(rating);
    if (content !== undefined) updateFields.content = content;
    if (service !== undefined) updateFields.service = service;
    if (status  !== undefined) updateFields.status  = status;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial updated successfully', data: testimonial });
  } catch (error) {
    console.error('Error editing testimonial:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    res.status(500).json({ success: false, message: 'Error updating testimonial' });
  }
});

// PATCH - Update testimonial status (admin: approve / reject)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: `Testimonial ${status}`, data: testimonial });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ success: false, message: 'Error updating testimonial' });
  }
});

// DELETE - Delete a testimonial (admin)
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting testimonial' });
  }
});

export default router;
