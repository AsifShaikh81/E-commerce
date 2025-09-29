import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config({ path: "./config/.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;