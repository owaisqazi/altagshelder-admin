import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "962184573120-fsfrevmaj2u2736uen7e00sc9td8uu20.apps.googleusercontent.com";
const API_KEY = "AIzaSyAJsJJxZ7PzLxm1ataOF1waABP1AbD69mA";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = ({ tableData }) => {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          console.log("Google API client initialized.");
        });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const addEventsToCalendar = () => {
    tableData.forEach((entry) => {
      const event = {
        summary: `Deposit for ${entry.user.full_name}`,
        description: `Details:
          Hours: ${entry.hours}
          Transport: ${entry.isTransport ? "Yes" : "No"}
          Amount: ${entry.total}`,
        start: {
          dateTime: new Date(entry.date).toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(entry.date).toISOString(),
          timeZone: "UTC",
        },
      };

      const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      request.execute((event) => {
        console.log("Event created:", event);
      });
    });
  };

  return (
    <div>
      <button onClick={handleAuthClick}>Authorize Google Calendar</button>
      <button onClick={addEventsToCalendar}>View in Calendar</button>
      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
};

export default GoogleCalendar;
