type ExperienceProps = {
    image: string;
    company: string;
    position: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;

};
export default function Experience({ image, company, position, startMonth, startYear, endMonth, endYear}: ExperienceProps) {
    return (
        <div className="relative flex items-center my-8">
          {/* Image */}
          <div>
            <img src={image} max-width="20%" height="auto" />
          </div>
      
          {/* Company and Position */}
          <div className="flex flex-col text-left font-lato text-xl ml-5">
            <div className="font-bold">{company}</div>
            <div className="text-base">{position}</div>
          </div>
          {/* Dates */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-right font-lato text-xl">
            <div>
              {startMonth} {startYear} - {endMonth} {endYear}
            </div>
          </div>
          
        </div>

      );
      
};