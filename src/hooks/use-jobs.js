import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getJobs } from "@/api/apiJobs";

export default function useJobs(filters = {}) {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = await getToken();
      const data = await getJobs(token, filters);
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.location, filters.company_id, filters.searchQuery]);

  return { jobs, loading, refetch: fetchJobs };
}

