import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  // Decide where to send user
  const navigateUser = (role) => {
    if (role === "recruiter") {
      navigate("/post-job");
    } else {
      navigate("/jobs");
    }
  };

  // Save role to Clerk
  const handleRoleSelection = async (role) => {
    if (!user) return;

    try {
      await user.update({
        publicMetadata: {
          role: role,
        },
      });

      console.log("Role saved:", role);
      navigateUser(role);
    } catch (error) {
      console.error("Failed to save role:", error);
    }
  };

  // Auto redirect if role already exists
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = user?.publicMetadata?.role;
    if (role) {
      navigateUser(role);
    }
  }, [isLoaded, isSignedIn, user]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="w-full mt-40 px-10">
        <BarLoader width="100%" color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40 relative">
      
      {/* Title */}
      <h2 className="relative z-10 gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>

      {/* Buttons */}
      <div className="relative z-10 mt-16 grid grid-cols-2 gap-6 w-full max-w-3xl px-10">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
