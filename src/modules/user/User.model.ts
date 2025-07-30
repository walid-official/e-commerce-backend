import mongoose from 'mongoose';

// Accept only 11-digit Bangladeshi numbers starting with 01
const phoneRegex = /^01\d{9}$/;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        // Ensure user does not input +880 manually
        return phoneRegex.test(v);
      },
      message: (props: any) =>
        `${props.value} is not a valid Bangladeshi phone number. Use 11 digits starting with 01 (without +880).`,
    },
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});


userSchema.pre('save', function (next) {
  if (this.phone && !this.phone.startsWith('+880')) {
    this.phone = '+880' + this.phone.slice(1); 
  }
  next();
});

export const User = mongoose.model('User', userSchema);
