import Experience from "./Experience"
export default function Experiences() {
    return (
        <div>
        <Experience company="Extern" image="/Extern_logo.png" position="AI Engineer extern" startMonth="June" startYear="2026" endMonth="August" endYear="2026"></Experience>
        <Experience company="Trinity Technology Group" image="/TTG_logo.png" position="Transportation Security Officer" startMonth="July" startYear="2021" endMonth="June" endYear="2025"></Experience>
        {/* Add further experience here */}
        </div>
    )
};