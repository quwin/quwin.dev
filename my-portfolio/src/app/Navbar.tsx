import React, { useState, useEffect } from "react";

type NavbarProps = {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    educationRef: React.RefObject<HTMLDivElement | null>;
    workExperienceRef: React.RefObject<HTMLDivElement | null>;
    projectsRef: React.RefObject<HTMLDivElement | null>;
    assistantRef: React.RefObject<HTMLDivElement | null>;
};

export default function Navbar({
    aboutRef,
    educationRef,
    workExperienceRef,
    projectsRef,
    assistantRef,
}: NavbarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }

            setLastScrollY(currentScrollY);
        };

        // Attach scroll listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleScrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPopupOpen(true);
    }

    return (
        <>
        <div
            className={`fixed top-0 z-10 w-full bg-quarter-spanish-white px-2 py-3 transition-transform duration-300 sm:py-5 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-3 font-playfair text-base leading-none sm:gap-x-8 sm:text-2xl">
                <div className="flex items-center flex-col">
                    <div
                        className="cursor-pointer relative group"
                        onClick={() => handleScrollTo(aboutRef)}>
                    about
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div
                        className="cursor-pointer relative group"
                        onClick={() => handleScrollTo(assistantRef)}>
                        ask
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div
                        className="cursor-pointer relative group"
                        onClick={() => handleScrollTo(educationRef)}>
                    education
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div
                        className="cursor-pointer relative group"
                        onClick={() => handleScrollTo(workExperienceRef)}
                    >
                        <span className="sm:hidden">work</span>
                        <span className="hidden sm:inline">work experience</span>
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div
                        className="cursor-pointer relative group"
                        onClick={() => handleScrollTo(projectsRef)}>
                        projects
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <div className="cursor-pointer relative group">
                        <a onClick={handleResumeClick}>
                        resume
                        </a>
                        <div className="absolute left-0 right-0 mx-auto mt-1 h-1 w-1 bg-limed-oak opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

{isPopupOpen && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-xl shadow-xl max-w-md text-center">
            <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-3 right-3 text-xl font-bold hover:opacity-60"
            >
                ×
            </button>
            <p>
                Please send an email to ethantran@quwin.dev to request a PDF of the resume.
            </p>
        </div>
    </div>
)}
    </>
    );
}
