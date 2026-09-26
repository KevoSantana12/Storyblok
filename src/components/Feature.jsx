import { FeatureIcon } from './Icons';

export default function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature__icon">
        <FeatureIcon name={icon} />
      </div>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__text">{text}</p>
    </div>
  );
}
