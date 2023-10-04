import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://chakravarthy:chakri123@cluster0.uyzauje.mongodb.net/";

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
