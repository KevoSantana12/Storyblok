import { Link } from 'react-router';
import { ArrowRight, ImagePlaceholder } from '../storyblok/stories/landing/Utils/Icons';



// Background colors for cards without a photo, like in the design.
const TONES = ['#2F5A45', '#8A4B2A', '#8F6430', '#3E4F3A', '#6E3B2A', '#46604F'];

export default function Card({ slug, title, country, summary, image, index = 0 }) {
  return (
    <Link to={`/destinations/${slug}`} className="destination-card">
      <div className="destination-card__media" style={{ background: TONES[index % TONES.length] }}>
        {image ? <img src={image} alt="" loading="lazy" /> : <ImagePlaceholder />}
      </div>
      <div className="destination-card__body">
        <p className="eyebrow">{country}</p>
        <h3 className="destination-card__title">{title}</h3>
        <p className="destination-card__summary">{summary}</p>
        <span className="destination-card__more">
          Read the guide
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
