import { useState } from 'react';

// The form is for demo purposes: it does not send the email anywhere.
export default function CtaBanner({ headline, text, buttonText }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__box">
        <div className="cta__copy">
          <h2 id="cta-title" className="section-title">
            {headline}
          </h2>
          <p>{text}</p>
        </div>

        {sent ? (
          <p className="cta__thanks" role="status">
            Done! Check your inbox to confirm your subscription.
          </p>
        ) : (
          <form className="cta__form" onSubmit={handleSubmit}>
            <label htmlFor="cta-email">Email address</label>
            <div className="cta__row">
              <input id="cta-email" type="email" autoComplete="email" placeholder="you@email.com" required />
              <button type="submit" className="btn btn--primary">
                {buttonText}
              </button>
            </div>
            <p className="cta__note">One email a month. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
