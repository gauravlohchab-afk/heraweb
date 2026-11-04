import { Link } from 'react-router';
import { center, studioVideo } from '../../data/media.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import { Tree } from '../decor/Decor.jsx';

// Home-page introduction. Copy from the "About Us" section of the existing website.
export default function AboutIntro({ num = '01' }) {
  return (
    <section className="section about-intro" aria-labelledby="about-intro-title">
      <div className="container about-intro__grid">
        <div className="about-intro__visual">
          <Tree className="about-intro__tree decor--blue decor--soft" />
          <Media image={center.stairs} video={studioVideo} ratio="4 / 5" className="about-intro__plant reveal-img" sizes="(min-width: 900px) 26vw, 60vw" data-parallax="-0.04" />
          <Media image={center.doors} ratio="1 / 1" className="about-intro__stairs reveal-img" style={{ '--d': 2 }} sizes="(min-width: 900px) 18vw, 40vw" />
        </div>

        <div className="about-intro__text">
          <p className="eyebrow reveal">
            <span className="eyebrow__num">{num}</span>About Hera
          </p>
          <h2 className="h2 reveal" id="about-intro-title" style={{ '--d': 1 }}>
            More than beauty — <em>a sanctuary for self-care.</em>
          </h2>
          <p className="lede reveal" style={{ '--d': 2 }}>
            Hera Wellness Studio was founded with a simple vision — to create a sanctuary where beauty, health, and
            self-care come together.
          </p>
          <div className="about-intro__cols reveal" style={{ '--d': 3 }}>
            <p className="text-soft">
              Inspired by the goddess Hera, a symbol of strength, renewal, and well-being, our studio opened its doors to
              provide treatments that nurture both body and mind.
            </p>
            <p className="text-soft">
              What started as a small wellness haven has blossomed into a studio known for personalized care,
              high-quality treatments, and a commitment to helping every client look and feel their very best.
            </p>
          </div>
          <div className="cluster about-intro__foot reveal" style={{ '--d': 4 }}>
            <p className="about-intro__sign">Be one of our Heranians.</p>
            <Link to="/about/" className="link-arrow">
              Discover the studio <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
