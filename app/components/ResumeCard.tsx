import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: any }) => {
    const { id, companyName, jobTitle, feedback, imagePath, imagePage } = resume;
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const path = imagePath || imagePage;
            if (!path) return;
            const blob = await fs.read(path);
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath, imagePage]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000 flex-1">
                    <div className="w-full h-full min-h-[250px] sm:min-h-[300px]">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[250px] sm:h-[300px] object-cover object-top rounded-xl"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard;