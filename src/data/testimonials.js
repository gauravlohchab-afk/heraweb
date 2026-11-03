import { testimonialVideo } from './media.js';

// The studio's one client testimonial video (img/client-feedback.mp4).
// Name and title are shown on screen in the video itself; the transcript is
// the video's own burned-in captions, verbatim (including "Studio that").
export const featuredTestimonial = {
  name: 'Alexandra Constantino',
  role: 'Public figure / Model',
  treatments: ['HIFU', 'HydraFacial'],
  uploadDate: '2026-11-03',
  video: testimonialVideo,
  pullQuote: 'Not only do they focus on making you look good, they also focus on making you feel good.',
  highlights: [
    'From my first visit, I’ve always felt welcomed and comfortable.',
    'It’s a very personalized wellness journey with Hera.',
    'I really recommend Hera Wellness Studio.',
  ],
  transcript: [
    'Hi everyone, it’s Alex! And I’m back here at Hera Wellness Studio.',
    'From my first visit, I’ve always felt welcomed and comfortable, and the atmosphere here is very relaxed and you really feel at ease.',
    'One of the reasons why I came back here at Hera Wellness Studio is because not only do they focus on making you look good, they also focus on making you feel good. It’s a very personalized wellness journey with Hera.',
    'I’ve also seen better results in my face from HIFU treatment, and I also really like the HydraFacial because I felt very moisturized and refreshed, and it feels good after a long day and a long time of not taking care of yourself.',
    'If you’re looking for a studio that treats you with quality care and treats you gentle and kind, I really recommend Hera Wellness Studio.',
  ],
};

// Written reviews as published on the previous live website. Set to [] to hide.
export const reviews = [
  {
    name: 'Aileen Prada',
    source: 'Facebook client',
    quote:
      'I had stubborn acne scars for years, but after my CO2 Laser sessions, my skin feels smoother and more radiant. It’s like I got a fresh start!',
  },
  {
    name: 'Jonalyn Jasmin',
    source: 'Instagram client',
    quote:
      'I was nervous at first, but the treatment was more comfortable than expected. My fine lines faded, and now people tell me I look so refreshed!',
  },
  {
    name: 'Lyka Francisco',
    source: 'Facebook client',
    quote:
      'I didn’t want injections or downtime, and HIFU was the perfect choice. My jawline looks sharper, and my skin feels tighter — love the results!',
  },
];
