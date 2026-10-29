type ExperienceProps = {
    image?: string;
    imageClassName?: string;
    company: string;
    position: string;
    startMonth: string;
    startYear: string;
    endMonth?: string;
    endYear?: string;
    description?: string;
};

export default function Experience({ image, imageClassName = "object-contain", company, position, startMonth, startYear, endMonth, endYear, description }: ExperienceProps) {
    return (
        <div className="my-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                    <div className="shrink-0">
                        {image ? (
                            <img src={image} alt={`${company} logo`} className={`h-12 w-12 sm:h-16 sm:w-16 ${imageClassName}`} />
                        ) : (
                            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 font-lato text-xl font-bold text-gray-700 sm:h-16 sm:w-16">
                                {company.split(" ").map(word => word[0]).join("")}
                            </span>
                        )}
                    </div>
                    <div className="ml-4 flex flex-col text-left font-lato text-lg sm:text-xl">
                        <div className="font-bold">{company}</div>
                        <div className="text-base">{position}</div>
                    </div>
                </div>
                <div className="font-lato text-base sm:text-right sm:text-xl">
                    {startMonth} {startYear} - {endYear ? `${endMonth ? `${endMonth} ` : ""}${endYear}` : "Present"}
                </div>
            </div>
            {description && <p className="mt-3 font-lato text-base sm:ml-20">{description}</p>}
        </div>
    );
}
