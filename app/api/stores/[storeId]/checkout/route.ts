import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

const corsHeaders = {
  "Acess-Control-Allow-Orign": "*",
  "Acess-Control-Allow-Meathods": "GET, PUT, POST, DELETE, OPTIONS",
  "Acess-Control-Allow-Headers": "Content-Type, Authorization",
};
