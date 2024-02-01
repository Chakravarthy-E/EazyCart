import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectToDB = async () => {
  const connectionUrl = process.env.NEXT_PUBLIC_DB;

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log(`getting error from DB connection ${error} `);
    });
};
export default connectToDB;
