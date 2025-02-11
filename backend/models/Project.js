// server/models/Project.js
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNo: {
    type: String,
    required: true,
    trim: true
  }
});

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  division: {
    type: String,
    trim: true
  },
  leader: {
    type: String,
    required: true,
    trim: true
  },
  leaderRollNo: {
    type: String,
    required: true,
    trim: true
  },
  teamMembers: [teamMemberSchema],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  guideName: {
    type: String,
    trim: true
  },
  copyright: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  applicationNo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Generate project ID before saving
projectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const count = await mongoose.model('Project').countDocuments();
    this.projectId = `PRJ${year}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model('Project', projectSchema);