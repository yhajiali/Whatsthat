import { Alert, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import EditProfileInfo from "../components/Profile/edit-profile-details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProfile = () => {
  const Navigation = useNavigation();
  // edit options
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);
  // userDetails
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [newUserInfo, setNewUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();

    Navigation.setOptions({
      headerShown: true,
      headerRight: () =>
        editing ? (
          <Text
            style={styles.headerText}
            onPress={() => {
              if (newUserInfo) {
                updateUserInfo();
                setEditing(false);
              }
            }}
          >
            Done
          </Text>
        ) : (
          cancel && (
            <Text
              style={styles.headerText}
              onPress={() => {
                setCancel(false);
              }}
            >
              Cancel
            </Text>
          )
        ),
    });
  }, [editing, cancel, newUserInfo]);

  async function getUserInfo() {
    // Retrieve user authentication details
    const userId = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // Request user details from user endpoint using user's ID and Authentication token
    await axios
      .get(`http://localhost:3333/api/1.0.0/user/${userId}`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Getting User's Details...`);
        // store user data pulled...
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  }

  // HIT update user information endpoint
  const updateUserInfo = async () => {
    const user_id = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // PATCH send new name to update chat info endpoint
    await axios
      .patch(`http://localhost:3333/api/1.0.0/user/${user_id}`, newUserInfo, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(
          `Status: ${response.status} ~ Updating User's Information...`
        );
        // rerender page
        getUserInfo();
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert("Error", error.response.data);
      });
  };

  return (
    <EditProfileInfo
      userInfo={userInfo}
      newUserInfo={newUserInfo}
      setNewUserInfo={setNewUserInfo}
      setEditing={setEditing}
      setCancel={setCancel}
    />
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontWeight: "500",
    marginHorizontal: 5,
  },
});
