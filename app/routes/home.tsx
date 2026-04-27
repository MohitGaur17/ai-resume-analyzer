import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TalentLens AI" },
    { name: "description", content: "TalentLens AI is an intelligent resume analysis platform that evaluates resumes, extracts skills, and matches candidates with job descriptions using AI-powered scoring and insights." },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect( () => {
    if (!isLoading && !auth.isAuthenticated) {
      const nextPath = `${location.pathname}${location.search}${location.hash}`;
      navigate(`/auth?next=${encodeURIComponent(nextPath)}`, { replace: true });
    }
  }, [auth.isAuthenticated, isLoading, location.hash, location.pathname, location.search, navigate])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover px-4">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>

      {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map(resume => (
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      )}
    </section>
  </main>
}
