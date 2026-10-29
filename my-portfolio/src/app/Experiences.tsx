import Experience from "./Experience";

export default function Experiences() {
    return (
        <div>
            <Experience
                company="Perio Specialist"
                image="/Perio_Specialist_logo.png"
                imageClassName="object-cover object-left"
                position="Software Engineer Intern"
                startMonth="July"
                startYear="2026"
                description="Building a replicated dental implant inventory system with transactional updates, idempotent writes, optimistic concurrency checks, offline queues, and automated backups."
            />
            <Experience company="Pfizer-hosted Externship Program" image="/Extern_logo.png" position="AI Engineering Extern" startMonth="June" startYear="2026" endMonth="July" endYear="2026" />
            <Experience company="Trinity Technology Group" image="/TTG_logo.png" position="Transportation Security Officer" startMonth="July" startYear="2021" endMonth="June" endYear="2025" />
        </div>
    );
}
