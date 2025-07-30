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
      setMessage(`❌ ${error.message}`);
    } else {
      // setupIntent.id or setupIntent.payment_method
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
        setMessage("❌ خطا در ذخیره Payment Method");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <h2>ورود اطلاعات پرداخت</h2>
      <input
        type="email"
        required
        value={email}
        placeholder="ایمیل"
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, width: "100%" }}
      />
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "در حال ارسال..." : "ذخیره روش پرداخت"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
