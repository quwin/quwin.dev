"use client"
import React, { useRef } from "react";
import Label from "./Label";
import Text from "./Text";
import Experiences from "./Experiences";
import Education from "./Education";
import Projects from "./Projects";
import Navbar from "./Navbar";
import ProjectAssistant from "./ProjectAssistant";

export default function Content() {
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const educationRef = useRef<HTMLDivElement | null>(null);
    const workExperienceRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const assistantRef = useRef<HTMLDivElement | null>(null);
    return (
        <>
            <Navbar
                aboutRef={aboutRef}
                assistantRef={assistantRef}
                educationRef={educationRef}
                workExperienceRef={workExperienceRef}
                projectsRef={projectsRef}
            />
            <div className="flex flex-col justify-center mx-40">
                <div ref={aboutRef}>
                    <Label name="about" />
                    <Text label="about" />
                </div>
                <div ref={assistantRef}>
                    <ProjectAssistant />
                </div>
                <div ref={educationRef}>
                    <Label name="education" />
                    <Education
                        school="California State University, Sacramento"
                        image="/CSUS_logo.svg"
                        major="Computer Science, B.S."
                        startMonth="September"
                        startYear="2025"
                        endMonth="December"
                        endYear="2027"
                    />
                    <Education
                        school="Santa Rosa Junior College"
                        image="/SRJC_logo.svg"
                        major="Computer Science"
                        startMonth="September"
                        startYear="2023"
                        endMonth="August"
                        endYear="2025"
                    />
                </div>
                <div ref={workExperienceRef}>
                    <Label name="work experience" />
                    <Experiences />
                </div>
                <div ref={projectsRef}>
                    <Label name="projects" />
                    <Projects />
                </div>
            </div>
        </>
    );
}
