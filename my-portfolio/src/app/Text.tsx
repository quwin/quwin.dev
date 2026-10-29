"use client";
import { TypeAnimation } from 'react-type-animation';

type TextProps = {
    label: string;
};

export default function Text({ label }: TextProps) {
    if (label === "about") {
        return <div className="font-lato text-xl my-8">
            <div className="flex flex-wrap mb-2">I’m Ethan Tran,{" "}
                <TypeAnimation sequence={[" a database enthusiast 💻!", 2000, " a software engineer!", 2000, " a gym go-er 🏋️!", 2000, " a basketball enjoyer 🏀!", 2000, " a poker player ♠️!", 2000, " a boba lover 🧋!", 2000]} speed={50} deletionSpeed={75} repeat={Infinity} className="ml-1" />
            </div>
            <p>I’m a Computer Science senior at CSU Sacramento focused on <span className="font-bold">database systems, especially query engines and query optimization.</span> I’m interested in how databases plan and execute queries, organize data, and use memory efficiently to make data-intensive workloads faster and more reliable.</p>
            <p className="my-2">
                As a Software Engineer Intern at Perio Specialist, I build database-backed systems for dental implant inventory across networked workstations. My work includes application-level replication, transactional updates, idempotent writes, optimistic concurrency checks, and offline queues to keep inventory data consistent through conflicting edits and network outages.
            </p>
            <p>
                I contribute to <a href="https://github.com/apache/datafusion" className="underline">Apache DataFusion</a> and <a href="https://github.com/postgres/postgres" className="underline">PostgreSQL</a>, working on query planning, optimizer behavior, and execution correctness. I enjoy tracing performance regressions, benchmarking changes, and understanding the trade-offs behind database internals. Rust is my favorite language to work in, alongside C++, C, Python, Go, and SQL.
            </p>
        </div>;
    }
}
