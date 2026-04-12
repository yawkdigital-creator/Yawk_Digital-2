import express from 'express';
import StrategyCall from '../models/StrategyCall.js';

const router = express.Router();

// POST - Submit strategy call form
router.post('/submit', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      serviceInterest,
      estimatedBudget,
      projectDescription,
      subOptions,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !serviceInterest || 
        !estimatedBudget || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'All required fields are missing',
      });
    }

    // Create new strategy call submission
    const strategyCall = new StrategyCall({
      firstName,
      lastName,
      email,
      phone: phone || '',
      company: company || '',
      serviceInterest,
      estimatedBudget,
      projectDescription,
      subOptions: subOptions || [],
    });

    // Save to database
    await strategyCall.save();

    res.status(201).json({
      success: true,
      message: 'Strategy call request submitted successfully',
      data: {
        id: strategyCall._id,
        firstName: strategyCall.firstName,
        lastName: strategyCall.lastName,
        email: strategyCall.email,
        submittedAt: strategyCall.submittedAt,
      },
    });
  } catch (error) {
    console.error('Error submitting strategy call:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A submission with this email already exists',
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
});

// GET - Get all strategy call submissions (for admin use)
router.get('/submissions', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Get submissions with pagination
    const submissions = await StrategyCall.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count
    const total = await StrategyCall.countDocuments(query);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
    });
  }
});

// GET - Get single submission by ID
router.get('/submissions/:id', async (req, res) => {
  try {
    const submission = await StrategyCall.findById(req.params.id).select('-__v');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
    });
  }
});

// PATCH - Update submission status (for admin use)
router.patch('/submissions/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'scheduled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const submission = await StrategyCall.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: submission,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
    });
  }
});

export default router;
