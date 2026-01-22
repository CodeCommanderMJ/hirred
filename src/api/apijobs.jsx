import supabaseClient from "../utils/supabase.js";

/* ===============================
   FETCH ALL JOBS (with filters)
================================ */
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, saved:saved_jobs(id), company:companies(name,logo_url)");

  if (location && location.trim() !== "") {
    query = query.eq("location", location);
  }

  if (company_id && company_id.trim() !== "") {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return [];
  }

  return data;
}

/* ===============================
   FETCH SAVED JOBS
================================ */
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return [];
  }

  return data;
}

/* ===============================
   FETCH SINGLE JOB
================================ */
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), applications:applications(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

/* ===============================
   SAVE / UNSAVE JOB
================================ */
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.error("Error removing saved job:", error);
    }

    return [];
  } else {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (error) {
      console.error("Error saving job:", error);
      return [];
    }

    return data;
  }
}

/* ===============================
   TOGGLE JOB STATUS
================================ */
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

/* ===============================
   GET MY JOBS (Recruiter)
================================ */
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching My Jobs:", error);
    return [];
  }

  return data;
}

/* ===============================
   DELETE JOB
================================ */
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job:", error);
    return null;
  }

  return data;
}

/* ===============================
   ADD NEW JOB
================================ */
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating job:", error);
    throw new Error("Job creation failed");
  }

  return data;
}
