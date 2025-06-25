import Link from 'next/link';
import { FadeInView } from '@/components/ui/FadeInView';

type Tag = {
  name: string;
  slug: string;
  count: number;
};

const Tags = async ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tags.map((tag, index) => {
        const { name, slug, count } = tag;

        return (
          <FadeInView
            key={slug}
            delay={index * 0.1}
            duration={0.6}
            enableHover
            as="div"
            className="group"
          >
            <Link href={`/blogg/tag/${slug}`} className="block">
              <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 dark:bg-gray-800/70 dark:border-gray-700/30 p-6">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-green-50/20 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-emerald-900/20 dark:via-green-900/10 dark:to-teal-900/20" />
                
                {/* Content */}
                <div className="relative space-y-3">
                  {/* Tag Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>

                  {/* Tag Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:via-green-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                    #{name}
                  </h3>

                  {/* Post Count */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {count} {count === 1 ? 'artikel' : 'artiklar'}
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <div className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Läs artiklar
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent dark:via-emerald-700"></div>
              </div>
            </Link>
          </FadeInView>
        );
      })}
    </div>
  );
};
export default Tags;
