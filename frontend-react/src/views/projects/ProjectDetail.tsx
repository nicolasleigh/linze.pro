import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ProjectHeader from "./ProjectHeader"
import Aside from "../about/Aside"
import Section from "../about/Section"
import { h2Style, h3Style, paragraphStyle, unorderedListStyle, orderedListStyle } from "../CommonStyle"
import { getSectionTitleAndSlug } from "@/utils/helper"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useState, useEffect } from "react"

interface ProjectData {
    title: string
    about: string
    repo: string
    website?: string
    sections: {
        slug: string
        title: string
        content: React.ReactNode
    }[]
    images?: string[]
}

const projectsData: Record<string, ProjectData> = {
    musicfy: {
        title: "MusicFy",
        about: "A full-stack music streaming app for mobile, built with bare React Native.",
        repo: "https://github.com/nicolasleigh/musicfy",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <>
                        <p className={paragraphStyle}>
                            MusicFy is a full-stack mobile music streaming application built using bare React Native,
                            with a backend powered by Node.js, Express, and MongoDB. Designed as a course project,
                            this app was developed to deepen my understanding of mobile app development beyond the
                            Expo framework.
                        </p>
                        <p className={paragraphStyle}>
                            MusicFy enables authenticated users to upload, manage, and stream music, offering features
                            such as email verification, password reset, playlists, favorites, listening history, and
                            user following. To enhance performance, the app utilizes the mobile device's caching
                            system to store audio files locally for smoother playback.
                        </p>
                    </>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <>
                        <p className={paragraphStyle}>
                            MusicFy was built with a robust and modern full-stack setup.
                        </p>
                        <h3 className={h3Style}>Frontend (Mobile App)</h3>
                        <ul className={unorderedListStyle}>
                            <li>React Native – for building cross-platform mobile apps without Expo</li>
                            <li>React Navigation – for handling navigation between screens</li>
                            <li>Redux – for managing global app state</li>
                            <li>React Query – for efficient data fetching, caching, and syncing</li>
                            <li>AsyncStorage – for local caching of audio files</li>
                        </ul>
                        <h3 className={h3Style}>Backend</h3>
                        <ul className={unorderedListStyle}>
                            <li>Node.js + Express – for building the RESTful API</li>
                            <li>MongoDB + Mongoose – NoSQL database</li>
                            <li>JWT – for authentication</li>
                            <li>Nodemailer – for email verification</li>
                        </ul>
                        <h3 className={h3Style}>Deployment</h3>
                        <ul className={unorderedListStyle}>
                            <li>Docker – for containerization</li>
                            <li>Caddy – reverse proxy with HTTPS</li>
                        </ul>
                    </>
                ),
            },
            {
                slug: "what-i-learned",
                title: "What I Learned",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>Bare React Native experience and native module integration</li>
                        <li>State management with Redux and React Query</li>
                        <li>Full-stack development with Node.js, Express, and MongoDB</li>
                        <li>Authentication flows with JWT and email verification</li>
                        <li>Audio caching strategies for mobile performance</li>
                        <li>DevOps with Docker and Caddy</li>
                    </ul>
                ),
            },
            {
                slug: "future-improvements",
                title: "Future Improvements",
                content: (
                    <>
                        <ol className={orderedListStyle}>
                            <li>Automated Testing</li>
                            <li>CI/CD Pipeline</li>
                            <li>Redis / CDN Caching</li>
                            <li>Rate Limiting & Load Balancing</li>
                            <li>Localization / Internationalization</li>
                            <li>Lyrics Support</li>
                        </ol>
                    </>
                ),
            },
        ],
    },
    petify: {
        title: "Petify",
        about: "A social app for pet lovers to share moments and connect with others.",
        repo: "https://github.com/nicolasleigh/petify",
        website: "https://pet.linze.pro",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <p className={paragraphStyle}>
                        Petify is a social platform for pet owners to share photos, connect with other pet lovers,
                        and discover pet-related content. Built with React Native and Node.js.
                    </p>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>React Native (Expo)</li>
                        <li>Node.js + Express</li>
                        <li>MongoDB</li>
                        <li>React Navigation</li>
                    </ul>
                ),
            },
            {
                slug: "features",
                title: "Features",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>Photo sharing</li>
                        <li>User profiles</li>
                        <li>Follow system</li>
                        <li>Pet profiles</li>
                    </ul>
                ),
            },
        ],
    },
    cabinfy: {
        title: "Cabinfy",
        about: "A booking platform for unique cabins and vacation rentals.",
        repo: "https://github.com/nicolasleigh/cabinfy",
        website: "https://cabin.linze.pro",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <p className={paragraphStyle}>
                        Cabinfy is a vacation rental booking platform that connects travelers with unique cabin
                        experiences. Features include property listings, booking management, and user reviews.
                    </p>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>React Native (Expo)</li>
                        <li>Node.js + Express</li>
                        <li>MongoDB</li>
                        <li>Stripe (payments)</li>
                    </ul>
                ),
            },
        ],
    },
    moviefy: {
        title: "Moviefy",
        about: "A movie discovery and streaming platform with personalized recommendations.",
        repo: "https://github.com/nicolasleigh/moviefy",
        website: "https://movie.linze.pro",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <p className={paragraphStyle}>
                        Moviefy is a movie discovery and streaming platform that helps users find movies
                        based on their preferences. Features include personalized recommendations,
                        watchlists, and reviews.
                    </p>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>React</li>
                        <li>Tailwind CSS</li>
                        <li>Node.js + Express</li>
                        <li>MongoDB</li>
                        <li>I18next (i18n)</li>
                    </ul>
                ),
            },
        ],
    },
    chatify: {
        title: "Chatify",
        about: "A real-time chat application with modern features.",
        repo: "https://github.com/nicolasleigh/chatify",
        website: "https://chat.linze.pro",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <p className={paragraphStyle}>
                        Chatify is a real-time chat application featuring instant messaging,
                        user authentication, and modern UI/UX design.
                    </p>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>Next.js</li>
                        <li>Go</li>
                        <li>Tailwind CSS</li>
                        <li>PostgreSQL</li>
                    </ul>
                ),
            },
        ],
    },
    blog: {
        title: "Blog",
        about: "A full-featured blog with bilingual support.",
        repo: "https://github.com/nicolasleigh/chatify",
        website: "https://linze.pro",
        sections: [
            {
                slug: "project-overview",
                title: "Project Overview",
                content: (
                    <p className={paragraphStyle}>
                        A personal blog built with modern web technologies, featuring
                        bilingual support (English/Chinese), markdown content, and a clean design.
                    </p>
                ),
            },
            {
                slug: "tech-stack",
                title: "Tech Stack",
                content: (
                    <ul className={unorderedListStyle}>
                        <li>Vue.js / React</li>
                        <li>Go</li>
                        <li>Tailwind CSS</li>
                        <li>PostgreSQL</li>
                        <li>I18next</li>
                    </ul>
                ),
            },
        ],
    },
}

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>()
    const { i18n } = useTranslation()
    const { activeSection } = useActiveSection()

    const projectKey = slug?.toLowerCase()
    const project = projectsData[projectKey || ""]

    if (!project) {
        return (
            <div className="layout pb-12 pt-32 md:pb-20 md:pt-64">
                <h1 className="text-neutral-100 text-4xl">Project not found</h1>
            </div>
        )
    }

    const section = getSectionTitleAndSlug(project.sections.map((s) => s.title))

    return (
        <section>
            <div className="layout pb-12 pt-[8.6rem] md:pb-20 md:pt-[9.6rem]">
                <ProjectHeader
                    title={project.title}
                    about={project.about}
                    repo={project.repo}
                    website={project.website}
                />
                <section className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
                    <article className="mx-auto w-full transition-colors text-neutral-400">
                        {project.sections.map((sectionItem, index) => (
                            <Section key={index} id={sectionItem.slug}>
                                <h2 className={h2Style}>{sectionItem.title}</h2>
                                {sectionItem.content}
                            </Section>
                        ))}
                    </article>
                    <Aside section={section} activeSection={activeSection} />
                </section>
            </div>
        </section>
    )
}
