type EducationProps = {
    image: string;
    school: string;
    major: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
};
export default function Education( {image, school, major, startMonth, startYear, endMonth, endYear}: EducationProps) {
    return (
        <div className="relative flex items-center my-8">
            {/* Image */}
            <div>
                <img src={image} max-width="20%" height="auto"/>
            </div>
            {/* School and Major */}
            <div className="flex flex-col text-left font-lato text-xl ml-5">
                <div className="font-bold">{school}</div>
                <div className="text-base">{major}</div>
          </div>
            {/* Dates */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-right font-lato text-xl">
                <div>
                    {startMonth} {startYear} - {endMonth} {endYear}
                </div>
          </div>
        </div>
    )
}