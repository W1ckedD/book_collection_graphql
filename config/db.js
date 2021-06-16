const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to MongoDB: ${conn.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
