const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Rollwala:rollwala@cluster0.zde4mle.mongodb.net/Rolwala_Bsl", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Define MongoDB Schemas
const invoiceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  phone: String,
  email: String,
  order_data: Array,
  total_price: Number,
  invoice_date: Date,
}, {
  toJSON: {
    virtuals: true
  }
});

// Create a virtual property for the ascending order ID
invoiceSchema.virtual('id').get(function() {
  return this.invoiceIndex + 1;
});

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoices");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  order_data: [{
    Order_date: String,
    id: String,
    name: String,
    qty: String,
    size: String,
    price: Number,
    img: String,
    __v: Number
  }]
});

const Order = mongoose.model("Order", orderSchema, "orders");

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  email: String,
  password: String,
  date: Date,
});

const User = mongoose.model("User", userSchema);

const rollBSLSchema = new mongoose.Schema({
  category: String,
  itemName: String,
  price: Number,
});

const RollBSL = mongoose.model("RollBSL", rollBSLSchema, "roll_bsl");

app.get("/api/invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    const invoicesWithIndex = invoices.map((invoice, index) => ({
      ...invoice.toObject(),
      invoiceIndex: index
    }));
    res.json(invoicesWithIndex);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).send("Error fetching invoices");
  }
});

app.get("/api/invoices/totalCost", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    const totalCost = invoices.reduce((acc, invoice) => acc + invoice.total_price, 0);
    res.json({ totalCost });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/orders/newUsers", async (req, res) => {
  try {
    const orders = await Order.find();
    const uniqueUsers = new Set(orders.map(order => order.email));
    res.json({ newUsers: uniqueUsers.size });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/customers/total", async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();
    res.json({ totalCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/orders/latestMenu", async (req, res) => {
  try {
    const latestOrder = await Order.findOne().sort({ _id: -1 });
    const latestMenuItems = latestOrder.order_data.map(item => item.name);
    res.json(latestMenuItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

const barChartSchema = new mongoose.Schema({
  country: String,
  "hot dog": Number,
  burger: Number,
  sandwich: Number,
  kebab: Number,
  fries: Number,
  donut: Number,
});

const BarChart = mongoose.model("BarChart", barChartSchema, "mockBarData");

const pieChartSchema = new mongoose.Schema({
  id: String,
  label: String,
  value: Number,
});

const PieChart = mongoose.model("PieChart", pieChartSchema, "mockPieData");

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  phone: String,
  email: String,
  accessLevel: String,
});

const TeamMember = mongoose.model("TeamMember", teamSchema, "mockDataTeam");

const contactSchema = new mongoose.Schema({
  id: Number,
  registrarId: String,
  name: String,
  age: Number,
  phone: String,
  email: String,
  address: String,
  city: String,
  zipCode: String,
});

const Contact = mongoose.model("Contact", contactSchema, "mockDataContacts");

const lineChartSchema = new mongoose.Schema({
  id: String,
  data: [
    {
      x: String,
      y: Number,
    },
  ],
});

const LineChartData = mongoose.model("LineChartData", lineChartSchema, "mockLineData");

app.get("/api/barChartData", async (req, res) => {
  try {
    const barChartData = await BarChart.find();
    res.json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/pieChartData", async (req, res) => {
  try {
    const pieChartData = await PieChart.find();
    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/team", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lineChartData", async (req, res) => {
  try {
    const lineChartData = await LineChartData.find();
    res.json(lineChartData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
