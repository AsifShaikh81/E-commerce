// placing orders using COD methods
const PlaceOrder = async (req, res) => {};
// placing orders using stripe methods
const PlaceOrderStripe = async (req, res) => {};
// placing orders using razorpat methods
const PlaceOrderRazorpay = async (req, res) => {};

//All orders data for Asmin Panel
const allOrders = async (req, res) => {};
//user order for frontend
const userOrders = async (req, res) => {};

// update order status from admin panel
const updateStatus = async (req, res) => {};
export {
  PlaceOrder,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
