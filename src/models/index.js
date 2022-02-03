import mongoose from "mongoose";
import ContenedorMongoDB from "./ContenedorMongoDB.js";
import { deepClone, renameField } from "../utils/dataTools.js";

// ELECCIÓN DE PERSISTENCIA: MONGODB ****************
// **************************************************
const { Schema } = mongoose;

const messageSchema = new Schema({
  author: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
class MessagesDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("Message", messageSchema);
  }
}

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true }
});
class ProductsDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("Product", productSchema);
  }
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
class UsersDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("User", userSchema);
  }
  async getByUsername(username) {
    try {
      let element = await this.CollModel.findOne({ username }, { __v: 0 });
      return element ? renameField(deepClone(element), "_id", "id") : null;
    } catch (error) {
      throw new Error(
        `Error al obtener el elemento con username: '${username}': ${error}`
      );
    }
  }
}

const productsModel = new ProductsDaoMongoDB();
const messagesModel = new MessagesDaoMongoDB();
const userModel = new UsersDaoMongoDB();

export { productsModel, messagesModel, userModel };
