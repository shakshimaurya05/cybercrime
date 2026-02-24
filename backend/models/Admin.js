const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')  //package for password hashing

const adminSchema = new mongoose.Schema({
  username : {
    type : String,
    required: true,
    unique: true,
    trim: true  //automatically removed extra spaces from start&end only
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }

},
{timestamps : true}
);
adminSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();  //if password not changed no need to hash it
  const salt = await bcrypt.genSalt(10); //salt is random data added to pass before hashing
  //makes each hash unique, even if two users hae same pass
  this.password = await bcrypt.hash(this.password,salt);

});

adminSchema.methods.comparePassword = async function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

