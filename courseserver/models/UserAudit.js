import mongoose from "mongoose";

const userAuditSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  previousUser: {
    type: mongoose.Schema.Types.Mixed,
  },
  currentUser: {
    type: mongoose.Schema.Types.Mixed,
  },  
  updatedAt: { 
    type: Date,
    default: Date.now,
  },
});

export const UserAudit = mongoose.model("UserAudit", userAuditSchema);
