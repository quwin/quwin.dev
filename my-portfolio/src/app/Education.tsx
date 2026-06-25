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
    <div className="my-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
            <div className="shrink-0">
                <img src={image} className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
            </div>

            <div className="ml-4 flex flex-col text-left font-lato text-lg sm:text-xl">
                <div className="font-bold">{school}</div>
                <div className="text-base">{major}</div>
            </div>
        </div>

        <div className="font-lato text-base sm:text-right sm:text-xl">
            {startMonth} {startYear} - {endMonth} {endYear}
        </div>
    </div>
);
}