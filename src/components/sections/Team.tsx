import React from 'react';
import { Linkedin, Twitter, Github, Mail, Sparkles, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useIntersection } from '@/hooks/useIntersection';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'alex',
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Serial entrepreneur with 12+ years scaling digital brands. Built 3 companies from $0 to $50M+ ARR.',
    initials: 'AC',
    social: {
      linkedin: 'https://linkedin.com/in/alexchen',
      twitter: 'https://twitter.com/alexchen',
      email: 'alex@yawkdigital.com'
    }
  },
  {
    id: 'sarah',
    name: 'Sarah Martinez',
    role: 'Head of Design',
    bio: 'Award-winning designer specializing in conversion-optimized interfaces. Former design lead at Meta.',
    initials: 'SM',
    social: {
      linkedin: 'https://linkedin.com/in/sarahmartinez',
      twitter: 'https://twitter.com/sarahmartinez',
      email: 'sarah@yawkdigital.com'
    }
  },
  {
    id: 'michael',
    name: 'Michael Park',
    role: 'Lead Developer',
    bio: 'Full-stack architect with expertise in Next.js and performance optimization. 8+ years building scalable systems.',
    initials: 'MP',
    social: {
      linkedin: 'https://linkedin.com/in/michaelpark',
      github: 'https://github.com/michaelpark',
      email: 'michael@yawkdigital.com'
    }
  },
  {
    id: 'emily',
    name: 'Emily Johnson',
    role: 'Growth Strategist',
    bio: 'Data-driven marketer with proven track record of 10x growth. Expert in paid acquisition and funnel optimization.',
    initials: 'EJ',
    social: {
      linkedin: 'https://linkedin.com/in/emilyjohnson',
      twitter: 'https://twitter.com/emilyjohnson',
      email: 'emily@yawkdigital.com'
    }
  },
  {
    id: 'david',
    name: 'David Kim',
    role: 'Creative Director',
    bio: 'Brand strategist and visual storyteller. Transformed 50+ brands into market leaders through strategic design.',
    initials: 'DK',
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim',
      email: 'david@yawkdigital.com'
    }
  }
];

export const Team: React.FC = () => {
  const { ref, isIntersecting } = useIntersection();

  return (
    <section id="team" className="py-20 sm:py-24 md:py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 sm:mb-6">
            Meet The Team
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter mb-6 sm:mb-8">
            The <span className="gradient-text">Architects</span> Behind Your Growth
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            A collective of elite operators, designers, and strategists united by one mission: engineering profitable scale for ambitious brands.
          </p>
        </div>

        {/* Team Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transition-all duration-700 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {/* Decorative Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500/0 via-purple-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:via-purple-500/20 group-hover:to-red-500/20 rounded-3xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              {/* Floating Sparkles Effect */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
              </div>

              <Card
                hover
                className="relative flex flex-col h-full overflow-hidden"
              >
                {/* Gradient Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                {/* Profile Image/Initials */}
                <div className="relative mb-6 -mt-2">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150"></div>
                  
                  {/* Avatar Container */}
                  <div className="relative w-36 h-36 mx-auto">
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-slate-200/50 dark:border-white/10 group-hover:border-red-500/30 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12"></div>
                    <div className="absolute inset-2 rounded-full border border-slate-300/30 dark:border-white/5 group-hover:border-purple-500/30 transition-all duration-700 group-hover:scale-105 group-hover:-rotate-6"></div>
                    
                    {/* Main Avatar */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-red-500/20 via-purple-500/20 to-red-500/20 border-4 border-slate-200 dark:border-white/10 group-hover:border-red-500/50 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-700">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/10 via-purple-500/10 to-red-500/10 group-hover:from-red-500/20 group-hover:via-purple-500/20 group-hover:to-red-500/20 transition-all duration-700">
                          <span className="text-5xl font-heading font-black text-slate-900 dark:text-white group-hover:text-red-500 group-hover:scale-110 transition-all duration-700">
                            {member.initials}
                          </span>
                        </div>
                      )}
                      
                      {/* Shimmer Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"></div>
                    </div>

                    {/* Floating Badge for First Member */}
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="flex-grow flex flex-col px-2">
                  <h4 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mb-2 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-500 text-center">
                    {member.name}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-sm sm:text-base text-red-500 font-bold uppercase tracking-wider">
                      {member.role}
                    </p>
                    <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow text-center group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-500">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-slate-200 dark:border-white/5 group-hover:border-red-500/30 transition-colors duration-500">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group/link overflow-hidden"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover/link:from-red-500/10 group-hover/link:to-purple-500/10 transition-all duration-300"></div>
                        <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/link:text-red-500 relative z-10 transition-colors" />
                      </a>
                    )}
                    
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group/link overflow-hidden"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover/link:from-red-500/10 group-hover/link:to-purple-500/10 transition-all duration-300"></div>
                        <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/link:text-red-500 relative z-10 transition-colors" />
                      </a>
                    )}
                    
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group/link overflow-hidden"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover/link:from-red-500/10 group-hover/link:to-purple-500/10 transition-all duration-300"></div>
                        <Github className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/link:text-red-500 relative z-10 transition-colors" />
                      </a>
                    )}
                    
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:from-red-500/20 hover:to-red-500/10 hover:border-red-500/50 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group/link overflow-hidden"
                        aria-label={`Email ${member.name}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover/link:from-red-500/10 group-hover/link:to-purple-500/10 transition-all duration-300"></div>
                        <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/link:text-red-500 relative z-10 transition-colors" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-red-500/10 via-purple-500/10 to-red-500/10 border border-red-500/20 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Elite Operators <span className="text-red-500">•</span> Proven Track Records <span className="text-red-500">•</span> Results-Driven
            </span>
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};
