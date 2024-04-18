/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import { getItem, setItem } from "../Utils/storageHelper.js";
import Profile from "../Components/dietProfile/ProfileRow.js";
import ProfileForm from "../Components/dietProfile/ProfileForm.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MealPlan from "../Components/dietProfile/MealPlan.js";

const DietPlan = ({ loggedInUser, notify }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [isCreateProfile, setIsCreateProfile] = useState(false);
  const [profileData, setProfileData, profileDataRef] = useStateRef({});
  const [lastOpenedProfile, setLastOpenedProfile] = useState("");
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    getUserProfiles();
  }, []);

  const addUserProfile = (data) => {
    const profiles = getItem("profiles") ?? [];
    const profile = { name: data.name, data: data, userID: loggedInUser.id };
    profiles.forEach((profile, index) => {
      if (profile.userID === loggedInUser.id && profile.name === data.name) {
        profiles.splice(index, 1);
      }
    });
    profiles.push(profile);
    setItem("profiles", profiles);
    getUserProfiles();
    setIsCreateProfile(false);
    setLastOpenedProfile(data.name);
  };

  const getUserProfiles = () => {
    let profiles = getItem("profiles");
    if (!profiles) return [];
    profiles = profiles.map((profile) => {
      if (profile.userID === loggedInUser.id) {
        return {
          name: profile.name,
          data: profile.data,
          userID: profile.userID,
        };
      } else {
        return null;
      }
    });

    setUserProfiles(profiles);
  };

  const onEditClick = (profile) => {
    setLastOpenedProfile(profile.name);
    setProfileData(profile);
    setIsCreateProfile(true);
    console.log(lastOpenedProfile);
  };

  const onCreateProfileClick = () => {
    setIsCreateProfile(true);
    setProfileData({ name: "", data: {} });
  };

  const onMealClick = (profile) => {
    setMealPlan(profile);
  };

  return (
    <>
      {mealPlan ? (
        <MealPlan profile={mealPlan} setMealPlan={setMealPlan} />
      ) : (
        <div>
          {isCreateProfile && (
            <div
              style={{ paddingTop: "20px", cursor: "pointer" }}
              onClick={() => setIsCreateProfile(false)}
            >
              <ArrowBackIcon fontSize="large" />
            </div>
          )}
          <h1 className="page-title">Diet Profiles</h1>
          {isCreateProfile ? (
            <ProfileForm
              addUserProfile={addUserProfile}
              data={profileDataRef.current.data}
              notify={notify}
            />
          ) : (
            <div>
              {userProfiles.map((profile) => {
                return profile ? (
                  <Profile
                    key={profile.name}
                    profile={profile}
                    onEditClick={onEditClick}
                    expanded={lastOpenedProfile === profile.name}
                    onMealClick={onMealClick}
                  />
                ) : (
                  ""
                );
              })}
              <div onClick={() => onCreateProfileClick()}>
                <Profile
                  key="Create New Profile"
                  profile={{ name: "Create New Profile", data: {} }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DietPlan;
