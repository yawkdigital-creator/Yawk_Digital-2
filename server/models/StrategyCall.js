import mongoose from 'mongoose';

const strategyCallSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  serviceInterest: {
    type: String,
    required: [true, 'Service interest is required'],
    trim: true,
  },
  estimatedBudget: {
    type: String,
    required: [true, 'Estimated budget is required'],
    enum: ['Under $500', '$500 - $1,500', '$1,500 - $5,000', '$5,000+'],
  },
  projectDescription: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  subOptions: {
    type: [String],
    default: [],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'scheduled', 'completed'],
    default: 'new',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create indexes for better query performance
strategyCallSchema.index({ email: 1 });
strategyCallSchema.index({ submittedAt: -1 });
strategyCallSchema.index({ status: 1 });

const StrategyCall = mongoose.model('StrategyCall', strategyCallSchema);

export default StrategyCall;
