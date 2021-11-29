import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import { trackEvent } from '@/lib/analytics';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import LibraryCard from '@/components/content/library/LibraryCard';
import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import TC from '@/components/TC';
import Tooltip from '@/components/Tooltip';

export default function IndexPage({
  featuredPosts,
  featuredProjects,
  featuredLibrary,
  introPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const populatedPosts = useInjectContentMeta('blog', featuredPosts);
  const populatedIntro = useInjectContentMeta('blog', introPosts);
  const populatedProjects = useInjectContentMeta('projects', featuredProjects);
  const populatedLibrary = useInjectContentMeta('library', featuredLibrary);

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'flex flex-col justify-center mb-20 -mt-20 min-h-main',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h2 className='text-2xl md:text-4xl 2xl:text-5xl' data-fade='1'>
              Hi!
            </h2>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              You can call me <Accent>Clarence</Accent>
            </h1>
            <p
              className={clsx(
                'max-w-4xl mt-4 text-gray-700 md:mt-6 dark:text-gray-200',
                'md:text-lg 2xl:text-xl'
              )}
              data-fade='3'
            >
              I work with React Ecosystem, and write to teach people how to
              rebuild and redefine fundamental concepts through mental models.
            </p>
            <p
              className='max-w-4xl mt-3 leading-relaxed text-gray-700 md:mt-4 md:text-lg 2xl:text-xl dark:text-gray-200'
              data-fade='4'
            >
              Don't forget to sign my{' '}
              <CustomLink href='/guestbook'>guestbook</CustomLink>!
            </p>
            <div
              data-fade='5'
              className='flex flex-wrap gap-4 mt-8 md:!text-lg'
            >
              <div className='relative group'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 rounded blur animate-tilt',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'
                  )}
                />
                <ButtonLink href='#intro'>Read the blog</ButtonLink>
              </div>
              <ButtonLink href='/about'>Learn more about me</ButtonLink>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2',
              'rounded-md cursor-pointer transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='w-8 h-8 md:w-10 md:h-10 animate-bounce' />
          </UnstyledLink>
          <TC
            className={clsx(
              'absolute right-6 bottom-0',
              'transform-gpu translate-y-[37%]',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          />
        </section>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'flex flex-col-reverse items-center md:justify-start md:flex-row layout',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                <div className='w-full h-full mt-8 md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline leading-snug dark:leading-none decoration-clone'>
                      Rebuild your mental model
                    </Accent>
                  </h2>
                  <p className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    <Tooltip
                      withUnderline
                      content={
                        <>
                          A mental model is an explanation of someone's{' '}
                          <strong>thought process</strong> about how something
                          works. You can use it as your own guide that you can
                          test through some cases.
                        </>
                      }
                    >
                      Mental model
                    </Tooltip>{' '}
                    will make front-end development more{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      predictable
                    </strong>{' '}
                    by seeing how they work{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      fundamentally
                    </strong>
                    . In my blog, I'm sharing how I approach something and how
                    my mental model affect my learning about a certain topic.
                  </p>
                </div>
                <div className='w-full h-full'>
                  <ul className='relative h-full'>
                    <BlogCard
                      className={clsx(
                        'absolute transform-gpu max-w-[350px]',
                        'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                        'left-1/2 -translate-x-1/2 lg:translate-x-[-30%] md:translate-x-[-50%]',
                        'rotate-3 md:rotate-6 lg:rotate-12',
                        'pointer-events-none md:pointer-events-auto'
                      )}
                      post={populatedIntro[1]}
                    />
                    <BlogCard
                      className='mx-auto max-w-[350px]'
                      post={populatedIntro[0]}
                    />
                  </ul>
                </div>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='blog'>
                  <Accent>Featured Posts</Accent>
                </h2>
                <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/blog'
                  onClick={() => trackEvent('Home: See more post', 'navigate')}
                >
                  See more post
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='projects'>
                  <Accent>Featured Projects</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  Some projects that I'm proud of
                </p>
                <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedProjects.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/projects'
                  onClick={() =>
                    trackEvent('Home: See more project', 'navigate')
                  }
                >
                  See more project
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='library'>
                  <Accent>Library of Code Snippets</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  List of code snippets that I store for easy access.
                </p>
                <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedLibrary.map((snippet, i) => (
                    <LibraryCard
                      key={snippet.slug}
                      snippet={snippet}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/library'
                  onClick={() =>
                    trackEvent('Home: See more snippets', 'navigate')
                  }
                >
                  See more snippets
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllFilesFrontmatter('blog');
  const projects = await getAllFilesFrontmatter('projects');
  const library = await getAllFilesFrontmatter('library');

  const featuredPosts = getFeatured(blogs, [
    'react-core-concept-rendering-state',
    'react-loading-state-pattern',
    'nextjs-fetch-method',
    'nextjs-fetch-usecase',
    'btb-flex-mental-model',
    'youtube-list',
  ]);
  const featuredProjects = getFeatured(projects, [
    'ppdbsumsel',
    'side-projects',
    'love4heroes',
  ]);
  const featuredLibrary = getFeatured(library, [
    'absolute-import',
    'auth-context',
    'conventional-commit-readme',
    'husky-commitlint-prettier',
    'toast',
    'tailwindcss-basestyle',
  ]);

  const introPosts = getFeatured(blogs, [
    'btb-flex-mental-model',
    'nextjs-fetch-method',
  ]);

  return {
    props: { featuredPosts, featuredProjects, featuredLibrary, introPosts },
  };
}
