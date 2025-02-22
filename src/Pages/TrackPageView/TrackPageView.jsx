import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function TrackPageView() {
  const ref = new URLSearchParams(useLocation().search).get("ref");

  useEffect(() => {
    const sendPageViewCount = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/v1/api/update-counts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "pageview", ref }),
        });
      } catch (error) {
        throw new Error("Error sending page view count:", error);
      }
    };

    const sendVisitCount = async () => {
      if (!sessionStorage.getItem("visited")) {
        try {
        
          await fetch(`${import.meta.env.VITE_API_URL}/v1/api/update-counts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "visit", ref }),
          });
          sessionStorage.setItem("visited", "true");
        } catch (error) {
          throw new Error("Error sending visit count:");
        }
      }
    };

    sendPageViewCount();
    sendVisitCount();
  }, []);

  return null;
}

export default TrackPageView;
