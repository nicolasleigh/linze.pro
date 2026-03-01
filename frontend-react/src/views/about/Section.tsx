interface SectionProps {
    id?: string
    children: React.ReactNode
}

export default function Section({ id, children }: SectionProps) {
    return (
        <section data-section id={id} className="mb-10">
            {children}
        </section>
    )
}
