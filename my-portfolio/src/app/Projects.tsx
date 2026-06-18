import Project from "./Project"
export default function Projects() {
    const ragPipelineArray = ["Python", "Qdrant", "Langchain", "HuggingFace", "PyTorch", "FastAPI", "Docker", "AWS"];
    const pokerSolverArray = ["C++", "Cuda", "FLTK"];
    const portfolioArray = ["React", "Next", "Tailwind CSS", "TypeScript", "Vercel"];
    const belevatorArray = ["Rust", "Godot", "SpacetimeDB","SQL", "iOS API", "Android API", "OAuth"];
    const infiniportalArray = ["Python", "Javascript", "MySQL", "Flask", "Apache"]
    const dubuArray = ["Javascript", "HTML", "CSS"];
    const gwepArray = ["Rust", "MySQL", "Spacestation13 API"]
    return (
        <div>
            <Project name="RAG Pipeline for Github Documentation" link="https://github.com/quwin/RAG-Github-Documentation-Pipeline" description="A RAG-based deployable pipeline for ingesting and querying Github Documentation for LLMs, used here!" stack={ragPipelineArray} startMonth="June" startYear="2026" endMonth="July" endYear="2026"></Project>
            <Project name="UnderTheGun: GPU-Accelerated Postflop Poker Solver" link="https://github.com/quwin/UnderTheGun" description="An effecient No-Limit Texas Hold'em Postflop Poker Solver implementing GPU-accelerated Counterfactual Regret Minimization" stack={pokerSolverArray} startMonth="May" startYear="2026" endMonth="June" endYear="2026"></Project>
            <Project name="Portfolio Website" link="https://github.com/quwin/quwin.dev" description="My new portfolio website!" stack={portfolioArray} startMonth="June" startYear="2026" endMonth="June" endYear="2026"></Project>
            <Project name="Belevator" link="" description="A cross-platform deterministic physics-based mobile game, available on iOS and Android" stack={belevatorArray} startMonth="June" startYear="2025" endMonth="April" endYear="2026"></Project>
            <Project name="infiniport.al" link="https://github.com/quwin/infiniport.al" description="A full-stack web platform with AI-assisted Discord chatbot for community engagement" stack={infiniportalArray} startMonth="May" startYear="2024" endMonth="August" endYear="2024"></Project>
            <Project name="dubu.pro" link="https://github.com/quwin/dubu.pro" description="A visual coaching and analytics tool for the game Omega Strikers, using jQuery as a drawing tool." stack={dubuArray} startMonth="July" startYear="2023" endMonth="July" endYear="2023"></Project>
            <Project name="Chemical Recipe Search Engine" link="https://github.com/quwin/gwep_chem_finder" description="A high-performance search engine for chemical recipes for SpaceStation13" stack={gwepArray} startMonth="October" startYear="2022" endMonth="November" endYear="2022"></Project>
        </div>
    )
}