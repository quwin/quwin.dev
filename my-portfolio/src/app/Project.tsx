import { list } from "postcss"

type ProjectProps ={
    name: string,
    link: string,
    description: string,
    stack: Array<string>,
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string
}
export default function Project( { name, link, description, stack, startMonth, startYear, endMonth, endYear } : ProjectProps) {
    return (
        <div className="relative font-lato flex flex-col my-8">
            {/* Name and GitHub */}
            <div className="flex flex-col gap-2 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl">
                {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center text-left"
                >
                    <div className="font-bold break-words">{name}</div>
                    <img
                        src="/github-small.svg"
                        alt="Github"
                        className="ml-1 shrink-0"
                    />
                </a>
                ) : (
                    <div className="font-bold">{name}</div>
                )}
            {/* Dates */}
            <div className="text-base sm:text-right sm:text-xl">
                <div>
                    {startMonth} {startYear} - {endMonth} {endYear}
                </div>
            </div>
            </div>
            {/* Description */}
            <div className="text-base mt-2">{description}</div>
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {stack.map((tech, index) => (
                    <div
                    key={index}
                    className="px-3 py-1 rounded-full bg-quarter-spanish-white text-sm font-lato mt-2"
                    >
                    {tech}
                    </div>
                ))}
            </div>
        </div>
    )
}