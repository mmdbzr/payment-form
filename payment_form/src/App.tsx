import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import SubscribePage from "./components/SubscribePage";

const stripePromise = loadStripe(
  "pk_test_51RqJqXQp1ktC5CcAvYF25m0gbkzUQ3ADNy0nx2H8xKcu1vKl2lW60Y6QQcworsrzmfhSdTzRFcLB4c00XGdnhTXW00fepnK49S"
);

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/create-setup-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen h-full flex items-center justify-center flex-col">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Router>
            <Routes>
              <Route path="/" element={<PaymentForm />} />
              <Route path="/subscribe" element={<SubscribePage />} />
            </Routes>
          </Router>
        </Elements>
      )}
    </div>
  );
}

export default App;
