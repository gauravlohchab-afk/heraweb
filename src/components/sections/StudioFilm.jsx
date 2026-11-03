import { Link } from 'react-router';
import { clinicVideo } from '../../data/media.js';
import VideoPlayer from '../ui/VideoPlayer.jsx';
import Icon from '../ui/Icon.jsx';
import { Sprig, Ripples } from '../decor/Decor.jsx';

// The studio's own clinic film, presented as a cinematic feature.
export default function StudioFilm({ num = '02', showLink = true, className = '' }) {
  return (
    <section className={`section studio-film ${className}`} aria-labelledby="film-title">
      <Ripples className="studio-film__ripples decor--faint" rings={7} />
      <div className="container studio-film__grid">
        <div className="studio-film__text">
          <p className="eyebrow reveal">
            {num && <span className="eyebrow__num">{num}</span>}Inside the studio
          </p>
          <h2 className="h2 reveal" id="film-title" style={{ '--d': 1 }}>
            Step inside <em>Hera.</em>
          </h2>
          <p className="text-soft reveal" style={{ '--d': 2 }}>
            Take a look around before your visit — the reception, the bright marble interiors and the private
            treatment rooms where your sessions take place.
          </p>
          {showLink && (
            <div className="reveal" style={{ '--d': 3 }}>
              <Link to="/about/" className="link-arrow">
                More about the studio <Icon name="arrow" />
              </Link>
            </div>
          )}
        </div>
        <figure className="studio-film__video reveal">
          <VideoPlayer
            video={clinicVideo}
            label={clinicVideo.title}
            caption={
              <>
                <span>
                  <strong>Inside Hera Wellness Studio</strong>
                  Diliman, Quezon City
                </span>
                <span>0:35</span>
              </>
            }
          />
          <Sprig className="studio-film__leaf decor--blue decor--soft" />
        </figure>
      </div>
    </section>
  );
}
