import User from "../models/User.js";
import Stripe from "stripe";
import Charity from "../models/Charity.js";


// CREATE CHECKOUT SESSION
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { plan, userId } = req.body;

        console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY ? "Present ✅" : "Missing ❌");
    console.log("PLAN:", plan, "USER:", userId);
    console.log("CLIENT_URL:", process.env.CLIENT_URL);

    let price = 0;

    if (plan === "monthly") price = 500;   // ₹500
    if (plan === "yearly") price = 5000;   // ₹5000

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan} subscription`
            },
            unit_amount: price * 100
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.CLIENT_URL}/success?userId=${userId}&plan=${plan}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("CHECKOUT ERROR:", err.message);
   res.status(500).json({ msg: "Server Error" });
  }
};

// VERIFY PAYMENT & ACTIVATE SUBSCRIPTION
export const activateSubscription = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ FIXED POSITION
   if (user.subscription?.status === "active") {
  return res.json({
    msg: "Already subscribed",
    subscription: user.subscription
  });
}

    let expiry = new Date();
    let amount = 0;

    if (plan === "monthly") {
      expiry.setMonth(expiry.getMonth() + 1);
      amount = 500;
    } else {
      expiry.setFullYear(expiry.getFullYear() + 1);
      amount = 5000;
    }

    // ✅ Charity Donation Logic
    if (user.charity && user.charity.name) {
      let percentage = user.charity.percentage || 10;

      let donation = (percentage / 100) * amount;

      const charity = await Charity.findOne({ name: user.charity.name });

      if (charity) {
        charity.totalDonations += donation;
        await charity.save();
      }
    }

    // ✅ Update Subscription
    user.subscription = {
      plan,
      status: "active",
      expiry
    };

    await user.save();

    res.json({
      msg: "Subscription Activated",
      subscription: user.subscription
    });

  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};