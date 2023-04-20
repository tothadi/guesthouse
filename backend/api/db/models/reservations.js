const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ReservationsSchema = new mongoose.Schema({
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed'] },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: false },
  arrivalAt: { type: Date, required: true, unique: true },
  leaveAt: { type: Date, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now },
});

const OccupationSchema = new mongoose.Schema({
  dates: { type: Array, required: true },
  updatedAt: { type: Date, default: Date.now },
});

ReservationsSchema.methods.generateJwt = (reservation) => {
  return jwt.sign(
    {
      ...reservation,
    },
    process.env.JWT_SECRET,
    { expiresIn: 300 }
  );
};

mongoose.model("Reservations", ReservationsSchema);
mongoose.model("Occupation", OccupationSchema);
