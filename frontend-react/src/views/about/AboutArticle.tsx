import { useTranslation } from "react-i18next"
import {
    h2Style,
    paragraphStyle,
    unorderedListStyle,
} from "../CommonStyle"
import Section from "./Section"
import AboutTechStack from "./AboutTechStack"
import AboutContact from "./AboutContact"
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import { useActiveSection } from "@/hooks/useActiveSection"

const sectionTitleEn = [
    "Background & Education",
    "Programming Journey",
    "Learning Journey",
    "Current Focus",
    "Tech Stack",
    "Contact",
]

const sectionTitleZh = [
    "背景与教育经历",
    "编程旅程",
    "学习历程",
    "当前专注方向",
    "技术栈",
    "联系方式",
]

export default function AboutArticle() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language
    const { activeSection } = useActiveSection()

    const section = currentLanguage === "zh"
        ? getSectionTitleAndSlugChinese(sectionTitleZh)
        : getSectionTitleAndSlug(sectionTitleEn)

    return (
        <article className="mx-auto w-full transition-colors text-neutral-400">
            {currentLanguage === "zh" ? (
                <div>
                    <Section id={section[0].slug}>
                        <h2 className={h2Style}>{section[0].title}</h2>
                        <p className={paragraphStyle}>
                            我是 Nicolas Leigh（李林泽）—— 一位拥有经济与金融背景的自学软件开发者，目前专注于构建现代全栈 Web 应用。
                        </p>
                        <ul className={unorderedListStyle}>
                            <li>出生于 1994 年 7 月，中国云南省</li>
                            <li>2013 年高考理科成绩 617 分（云南省理科第 1522 名）</li>
                            <li>经济学学士，主修财政学（国家重点学科）</li>
                            <li>2017 年毕业于中南财经政法大学（"211 工程"高校）</li>
                            <li>中国注册会计师（于 2020 年通过全部六门专业考试）</li>
                            <li>自 2021 年起自学编程至今</li>
                        </ul>
                    </Section>
                    <Section id={section[1].slug}>
                        <h2 className={h2Style}>{section[1].title}</h2>
                        <p className={paragraphStyle}>
                            在从事财务审计工作一年后，我意识到这份职业并不符合我的个人价值观和长期发展目标。于是，在 2021 年 10 月，也就是新冠疫情期间，我开始了一段全新的旅程：学习编程。
                        </p>
                        <p className={paragraphStyle}>
                            我最初从 C 和 Java 入手，为我打下了扎实的编程基础和问题解决能力。但真正改变一切的是我偶然发现了 JavaScript —— 一门直观、富有表现力且充满创造力的语言。它带来的即时视觉反馈和构建交互式 Web 体验的能力深深吸引了我，也让我坚定了走上前端开发之路的决心。
                        </p>
                        <p className={paragraphStyle}>
                            随后，我拓展到了后端开发，选择了 Go（Golang）和 Node.js。由于我此前已有 C 和 Java 的经验，这一转变变得顺理成章，同时也让我能够使用更高效的工具和并发模式。这种全栈的开发方式，使我能够独立完成从界面到数据库的完整应用构建。
                        </p>
                    </Section>
                    <Section id={section[2].slug}>
                        <h2 className={h2Style}>{section[2].title}</h2>
                        <p className={paragraphStyle}>
                            作为一名自学开发者，我主要通过英文资源建立了自己的技术基础，学习平台包括 Udemy、Frontend Masters 以及 O'Reilly 系列图书。使用英语学习不仅显著提升了我的编程能力，也加强了我阅读英文文档、与国际开发社区交流的能力。
                        </p>
                        <p className={paragraphStyle}>
                            出于对语言和知识的热情，我还挑战自己学习法语，并通过英文作为媒介，现在已能够阅读 A2 水平的法语内容。这样的多语言学习经历进一步增强了我的适应能力和解决问题的思维方式。
                        </p>
                    </Section>
                    <Section id={section[3].slug}>
                        <h2 className={h2Style}>{section[3].title}</h2>
                        <p className={paragraphStyle}>
                            目前，我专注于使用 React、Vue.js、Node.js 和 Go 构建全栈 Web 应用，注重代码整洁性、系统性能与卓越的用户体验。我特别热衷于解决问题与批判性思维，这些能力源自我早期的财务审计背景。
                        </p>
                        <p className={paragraphStyle}>
                            我正在积极拓展对云原生架构的理解，并尝试将 Kubernetes 纳入我的技术工具链。同时，我也不断通过重构已有项目，持续打磨自己的全栈开发能力。
                        </p>
                        <p className={paragraphStyle}>
                            我始终相信，优秀的开发者从不停止学习，而我也将持续在每一次挑战中成长。
                        </p>
                    </Section>
                    <Section id={section[4].slug}>
                        <h2 className={h2Style}>{section[4].title}</h2>
                        <AboutTechStack />
                    </Section>
                    <Section id={section[5].slug}>
                        <h2 className={h2Style}>{section[5].title}</h2>
                        <p className={paragraphStyle}>
                            无论您对技术合作感兴趣、有工作机会，还是想要交流想法，我都非常乐意与您建立联系。
                        </p>
                        <p className={paragraphStyle}>您可以通过以下方式联系我：</p>
                        <AboutContact />
                        <p className={paragraphStyle}>期待您的来信！</p>
                    </Section>
                </div>
            ) : (
                <div>
                    <Section id={section[0].slug}>
                        <h2 className={h2Style}>{section[0].title}</h2>
                        <p className={paragraphStyle}>
                            I'm Nicolas Leigh (Li Linze) — a self-taught software developer with a background in economics and finance, now fully immersed in building modern full-stack web applications.
                        </p>
                        <ul className={unorderedListStyle}>
                            <li>Born in July 1994, Yunnan Province, China</li>
                            <li>Scored 617 in 2013 National College Entrance Exam (Ranked 1522 in Yunnan science track)</li>
                            <li>Bachelor of Economics, Major in Public Finance (National Key Discipline)</li>
                            <li>Graduated from Zhongnan University of Economics and Law (Project 211) in 2017</li>
                            <li>Certified Public Accountant of China (Passed all 6 professional exams in 2020)</li>
                            <li>Self-taught software developer since 2021</li>
                        </ul>
                    </Section>
                    <Section id={section[1].slug}>
                        <h2 className={h2Style}>{section[1].title}</h2>
                        <p className={paragraphStyle}>
                            After working in financial auditing for a year, I realized that career path didn't align with my personal values and aspirations. In October 2021, during the COVID-19 pandemic, I began a new journey: learning to code.
                        </p>
                        <p className={paragraphStyle}>
                            I started with C and Java, which laid a solid foundation for programming concepts and problem-solving. But everything changed when I discovered JavaScript — a language that felt intuitive, expressive, and creatively fulfilling. The immediate visual feedback and ability to build interactive web experiences drew me to frontend development.
                        </p>
                        <p className={paragraphStyle}>
                            Later, I expanded into backend development using Go (Golang) and Node.js. This transition felt natural thanks to my experience with C and Java, while allowing me to leverage more efficient tooling and concurrency patterns. This full-stack approach has enabled me to build complete applications from interface to database.
                        </p>
                    </Section>
                    <Section id={section[2].slug}>
                        <h2 className={h2Style}>{section[2].title}</h2>
                        <p className={paragraphStyle}>
                            As a self-taught developer, I've built my technical foundation primarily through English-language resources such as Udemy, Frontend Masters, and O'Reilly books. Learning in English has not only sharpened my programming skills but also strengthened my ability to navigate documentation and collaborate in global developer communities.
                        </p>
                        <p className={paragraphStyle}>
                            Driven by curiosity, I've also taken on the challenge of learning French — and can now comfortably read A2-level content, using English as the medium. This multilingual learning experience has deepened my adaptability and problem-solving mindset.
                        </p>
                    </Section>
                    <Section id={section[3].slug}>
                        <h2 className={h2Style}>{section[3].title}</h2>
                        <p className={paragraphStyle}>
                            Today, I build full-stack web applications using React, Vue.js, Node.js, and Go — with a strong emphasis on clean code, high performance, and exceptional user experience. I'm especially passionate about problem-solving and critical thinking, skills that stem from my background in financial auditing.
                        </p>
                        <p className={paragraphStyle}>
                            Currently, I'm expanding my expertise in cloud-native architectures and working to integrate Kubernetes into my toolchain. At the same time, I continue refining my full-stack skills by refactoring and improving the projects I've built.
                        </p>
                        <p className={paragraphStyle}>
                            I believe the best developers never stop learning — and I'm committed to growing through every challenge I take on.
                        </p>
                    </Section>
                    <Section id={section[4].slug}>
                        <h2 className={h2Style}>{section[4].title}</h2>
                        <AboutTechStack />
                    </Section>
                    <Section id={section[5].slug}>
                        <h2 className={h2Style}>{section[5].title}</h2>
                        <p className={paragraphStyle}>
                            Whether you're interested in technical collaboration, have a job opportunity, or simply want to exchange ideas, I'd be delighted to connect.
                        </p>
                        <p className={paragraphStyle}>Contact me via:</p>
                        <AboutContact />
                        <p className={paragraphStyle}>Looking forward to hearing from you!</p>
                    </Section>
                </div>
            )}
        </article>
    )
}
