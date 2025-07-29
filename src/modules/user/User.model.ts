import mongoose from 'mongoose';

const phoneRegex = /^01\d{9}$/; 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: string) {
        return phoneRegex.test(v);
      },
      message: (props: any) => `${props.value} is not a valid 11-digit Bangladeshi phone number starting with 01!`
    }
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Normalize phone to +880 format before saving
userSchema.pre('save', function(next) {
  if (this.phone && !this.phone.startsWith('+880')) {
    this.phone = '+880' + this.phone.slice(1); // Replace leading 0 with +880
  }
  next();
});

export const User = mongoose.model('User', userSchema);
