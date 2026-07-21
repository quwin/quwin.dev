import Experience from "./Experience"
export default function Experiences() {
    return (
        <div>
        <Experience company="Synk" image="/Synk_logo.jpeg" position="Software Engineer Intern" startMonth="July" startYear="2026" endMonth="July" endYear="2026"></Experience>
        <Experience company="Extern" image="/Extern_logo.png" position="Software Engineer Extern (Pfizer-hosted)" startMonth="May" startYear="2026" endMonth="June" endYear="2026"></Experience>
        <Experience company="Trinity Technology Group" image="/TTG_logo.png" position="Transportation Security Officer" startMonth="July" startYear="2021" endMonth="June" endYear="2025"></Experience>
        {/* Add further experience here */}
        </div>
    )
};