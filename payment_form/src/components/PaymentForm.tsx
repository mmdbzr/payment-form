import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) return;

    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/subscribe",
        payment_method_data: {
          billing_details: {
            email: email,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(` ${error.message}`);
    } else {
      const res = await fetch("http://localhost:3000/api/save-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: setupIntent.payment_method,
          customerEmail: email,
        }),
      });

      const data = await res.json();
      if (data.customerId) {
        localStorage.setItem("customerId", data.customerId);
        navigate("/subscribe");
      } else {
        setMessage("Error in saving Payment Method");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <input
        type="email"
        required
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 mb-3 w-full rounded-md border-[1px]"
      />
      <PaymentElement />
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#57CF7E] p-3 mt-3 rounded-md"
      >
        {loading ? "Processing..." : "Submit"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
