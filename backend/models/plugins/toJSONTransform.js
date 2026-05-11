const transformDoc = (_doc, ret) => {
  if (ret._id != null) {
    ret.id = ret._id.toString();
    ret._id = ret.id;
  }
  delete ret.__v;
  delete ret.password;
  delete ret.otp;
  delete ret.otpExpires;
  return ret;
};

module.exports = function applyJsonTransform(schema) {
  schema.set('toJSON', { virtuals: true, versionKey: false, transform: transformDoc });
  schema.set('toObject', { virtuals: true, versionKey: false, transform: transformDoc });
};
