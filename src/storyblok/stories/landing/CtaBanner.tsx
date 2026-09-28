import { SbBlokData } from '@storyblok/react';
import { useState } from 'react';

interface CtaBannerBlok extends SbBlokData {
    headline: string;
    text: string;
    button_text: string;
}



export default function CtaBanner({ blok }: { blok: CtaBannerBlok }) {
    const [sent, setSent] = useState(false);

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setSent(true);
    }

    return (
        <section className="cta" aria-labelledby="cta-title">
            <div className="cta__box">
                <div className="cta__copy">
                    <h2 id="cta-title" className="section-title">
                        {blok.headline}
                    </h2>
                    <p>{blok.text}</p>
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
                                {blok.button_text}
                            </button>
                        </div>
                        <p className="cta__note">One email a month. Unsubscribe anytime.</p>
                    </form>
                )}
            </div>
        </section>
    );
}
