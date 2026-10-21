import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';

const CARD_WIDTH = 256; // w-64
const CARD_GAP = 16; // gap-4
const INITIAL_REVIEWS = 6;

const CLIENT_STORIES = [
  { id: 's1', duration: '0:14', videoUrl: '/src/assets/videos/vid4.mp4' },
  { id: 's2', duration: '0:19', videoUrl: '/src/assets/videos/vid3.mp4' },
  { id: 's3', duration: '0:15', videoUrl: '/src/assets/videos/vid2.mp4' },
  { id: 's4', duration: '0:10', videoUrl: '/src/assets/videos/vid5.mp4' },
  { id: 's5', duration: '0:16', videoUrl: '/src/assets/videos/vid6.mp4' },
  { id: 's6', duration: '0:15', videoUrl: '/src/assets/videos/vid1.mp4' },
];

const CLIENT_REVIEWS = [
  {
    id: 'r1',
    name: 'Scott R.',
    company: '',
    rating: 5,
    text: "Feedbird creates social media content that's better and more affordable than what we can produce in-house. Went from 6 hours per client to just the 15 minutes needed for review and approval.",
  },
  {
    id: 'r2',
    name: 'Kirstin B.',
    company: '',
    rating: 5,
    text: 'It takes the socials off my hands but still gives me control over the end result given their review process. The onboarding was extremely thorough, there were very few edits required.',
  },
  {
    id: 'r3',
    name: 'Marina C.',
    company: '',
    rating: 5,
    text: "Immigration law isn't exactly known for visually exciting content, but Feedbird proved that wrong. Every post is creative, on-brand, and actually looks good.",
  },
  {
    id: 'r4',
    name: 'Alice N.',
    company: '',
    rating: 5,
    text: "We've been working with Feedbird for a few years now and we continue to be very pleased. They have different creators so things don't get stale.",
  },
  {
    id: 'r5',
    name: 'Jordan M.',
    company: '',
    rating: 5,
    text: "Feedbird is hands down the best decision I've made for my business in years. They've completely transformed my social media presence.",
  },
  {
    id: 'r6',
    name: 'James D.',
    company: '',
    rating: 5,
    text: 'Outstanding content with expert advice. Very happy! The process is easy to follow and I especially appreciate their carousel post add-on.',
  },
  {
    id: 'r7',
    name: 'Marcus T.',
    company: '',
    rating: 5,
    text: "I've tried many companies in the past 5 years and none was able to provide the value we get from Feedbird. The content is very relevant even though our industry is niche and technical.",
  },
  {
    id: 'r8',
    name: 'Chris P.',
    company: '',
    rating: 5,
    text: "We used to spend $500 a month for the same service with a different company, so I'm so glad Feedbird exists since they charge only a quarter of that.",
  },
  {
    id: 'r9',
    name: 'Anna L.',
    company: '',
    rating: 5,
    text: "Feedbird has been a total game-changer for my business. They make social media posting effortless and consistent, saving me hours every week.",
  },
  {
    id: 'r10',
    name: 'Sarah M.',
    company: '',
    rating: 5,
    text: "The quality is just outstanding. I’m very happy with everything and they truly have a team of highly capable social media professionals.",
  },
  {
    id: 'r11',
    name: 'David K.',
    company: '',
    rating: 5,
    text: "I've been working with Feedbird for the past few months, and I've really appreciated how reliable they are. Linda, my account manager, has been fantastic to work with.",
  },
  {
    id: 'r12',
    name: 'Rachel T.',
    company: '',
    rating: 5,
    text: "I'm so happy I went with Feedbird for my business's social media content. They captured my branding perfectly and I receive compliments all the time.",
  },
  {
    id: 'r13',
    name: 'Glauco C.',
    company: '',
    rating: 5,
    text: 'Feedbird handles my social media perfectly. High-quality, on-brand posts for Instagram, Facebook, and LinkedIn. Easy approvals, quick edits, great engagement boost.',
  },
  {
    id: 'r14',
    name: 'Emma W.',
    company: '',
    rating: 5,
    text: 'Seriously excellent service. They just make social media marketing easy. Great communication, easy to make edits.',
  },
  {
    id: 'r15',
    name: 'Thomas B.',
    company: '',
    rating: 5,
    text: 'Absolutely incredible company. I have told everyone about Feedbird. Always relevant, engaging content and fantastic visual designs.',
  },
  {
    id: 'r16',
    name: 'Laura V.',
    company: '',
    rating: 5,
    text: "We've had a great experience using Feedbird for Body Vitality's social media. They save us a ton of time and are very cost-effective.",
  },
  {
    id: 'r17',
    name: 'Hannah S.',
    company: '',
    rating: 5,
    text: 'Feedbird has been a revolution for our yoga community. Their customer support is exceptional and super responsive.',
  },
  {
    id: 'r18',
    name: 'Ben R.',
    company: '',
    rating: 5,
    text: 'Feedbird is the best. Solid, reliable posts for a very fair price. Could not be happier.',
  },
  {
    id: 'r19',
    name: 'Jeffrey E.',
    company: '',
    rating: 5,
    text: "I've been using Feedbird to post content on LinkedIn, and it's been a game changer. The process is seamless.",
  },
  {
    id: 'r20',
    name: 'Priya K.',
    company: '',
    rating: 5,
    text: "Feedbird has been a total win for us. They've been responsive, professional, and great to work with.",
  },
  {
    id: 'r21',
    name: 'Diana L.',
    company: '',
    rating: 5,
    text: 'I gotta give 5 stars. Professional, polite, follow-up reminders, hearing my input, efficient and beautiful posts that are ON brand and creative.',
  },
  {
    id: 'r22',
    name: 'Nathan H.',
    company: '',
    rating: 5,
    text: "I've been their client for more than a year as their content really is exceptional. Can wholeheartedly recommend!",
  },
  {
    id: 'r23',
    name: 'Megan G.',
    company: '',
    rating: 5,
    text: 'Feedbird has truly exceeded my expectations. The visuals, layouts, and wording are so spot-on that it feels like they know my business better than I do.',
  },
  {
    id: 'r24',
    name: 'Charlie W.',
    company: '',
    rating: 5,
    text: 'The folks at Feedbird are excellent partners. They are reliable, punctual, and on point.',
  },
];

export const ClientStories: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll
    ? CLIENT_REVIEWS
    : CLIENT_REVIEWS.slice(0, INITIAL_REVIEWS);

  const prev = () =>
    setIndex((i) => (i - 1 + CLIENT_STORIES.length) % CLIENT_STORIES.length);

  const next = () => setIndex((i) => (i + 1) % CLIENT_STORIES.length);

  return (
    <section className="py-16 sm:py-24 bg-[#eceae6] dark:bg-[#030712]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">
            // verified reviews
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.05] text-slate-900 dark:text-slate-50">
            Don&rsquo;t take our word for it.
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Clients on what changes when growth is handed to a team that owns it.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex gap-0.5 text-blue-500">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={14} fill="currentColor" />
              ))}
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Verified client reviews
            </span>
          </div>
        </div>

        {/* Video story carousel */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-slate-500">
            // hear it from them
          </span>

          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous video"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              aria-label="Next video"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translateX(-${index * (CARD_WIDTH + CARD_GAP)}px)`,
            }}
          >
            {CLIENT_STORIES.map((story) => (
              <div
                key={story.id}
                className="shrink-0 rounded-2xl overflow-hidden bg-slate-300 dark:bg-slate-800"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <div className="aspect-[9/14] relative flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                  {story.videoUrl ? (
                    <video
                      src={story.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-300">
                      <span className="w-14 h-14 rounded-full bg-white/80 dark:bg-slate-700 flex items-center justify-center shadow">
                        <Play size={24} fill="currentColor" />
                      </span>
                      <span className="text-sm font-medium">{story.duration}</span>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-900 px-4 py-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>Verified customer story</span>
                  <span>{story.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client reviews */}
        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-4">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="break-inside-avoid mb-4 rounded-xl bg-white dark:bg-slate-900 p-5 shadow-sm"
            >
              <div className="flex gap-0.5 text-blue-500 mb-3">
                {Array.from({ length: review.rating }).map((_, k) => (
                  <Star key={k} size={12} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {review.name}
                  </div>

                  {review.company && (
                    <div className="text-[11px] text-slate-500">{review.company}</div>
                  )}

                  <div className="text-[11px] text-slate-500">Verified review</div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {review.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .replace('.', '')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-6 py-3 rounded-full bg-white dark:bg-slate-800 shadow text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            {showAll ? 'Show fewer' : 'Show more reviews'}
          </button>
        </div>
      </div>
    </section>
  );
};
