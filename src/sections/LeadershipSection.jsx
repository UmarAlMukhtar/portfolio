import { leadershipCards } from "../constants";
import TitleHeader from "../components/TitleHeader";

const LeadershipSection = () => {
  return (
    <section id="leadership" className="md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Leadership & Community Roles" sub="🚀 Beyond Code" />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white-50/40 via-white-50/10 to-transparent" />

          <div className="flex flex-col gap-8">
            {leadershipCards.map((card) => (
              <div key={card.title} className="relative pl-12">
                <div className="absolute left-2 top-7 size-4 rounded-full bg-white border-4 border-black-100 z-10" />

                <article className="group relative min-h-56 overflow-hidden rounded-3xl border border-white-50/10 bg-black-200/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white-50/30">
                  <div className="transition-all duration-300 group-hover:opacity-10">
                    <p className="text-sm text-white-50">{card.date}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{card.title}</h3>
                    <p className="mt-4 text-[#839CB5]">{card.desc}</p>
                    <p className="mt-5 text-sm text-white-50/60">
                      Hover to view details
                    </p>
                  </div>

                  <div className="absolute inset-0 translate-y-4 p-7 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h4 className="text-xl font-semibold">{card.title}</h4>

                    <ul className="mt-5 flex flex-col gap-3">
                      {card.points.map((point, index) => (
                        <li key={index} className="flex gap-3 text-white-50">
                          <span className="mt-2 size-2 shrink-0 rounded-full bg-white-50/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;