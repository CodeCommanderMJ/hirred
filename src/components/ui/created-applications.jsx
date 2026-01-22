import { useUser } from "@clerk/clerk-react";
import JobCard from "./job-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user) {
      fnApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  if (!isLoaded || loadingApplications) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  }

  if (!applications || applications.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        You haven’t applied to any jobs yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          isCandidate={true}
        />
      ))}
    </div>
  );
};

export default CreatedApplications;
