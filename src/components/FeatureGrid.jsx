import Feature from './Feature';

export default function FeatureGrid({ headline, intro, items }) {
  return (
    <section className="feature-grid">
      <div className="section-head--narrow">
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>
      </div>
      <div className="feature-grid__items">
        {items.map((item) => (
          <Feature key={item.title} icon={item.icon} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}
