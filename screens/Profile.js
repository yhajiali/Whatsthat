import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import ProfileItem from "../components/Profile/profile-details";
import Button from "../components/Reusable/button";
import Loader from "../components/Reusable/loader";
import Colours from "../components/Reusable/colours";

const Profile = () => {
  const Navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);

  async function getUserInfo() {
    const userId = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    console.log(userId, userToken);
    await axios
      .get("http://localhost:3333/api/1.0.0/user/" + userId, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        // store user data pulled...
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  console.log(userInfo);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function logOut() {
    // setLoading(true);

    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    console.log(userToken);
    await axios
      .post("http://localhost:3333/api/1.0.0/logout", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        setTimeout(async () => {
          setLoading(false);
          await AsyncStorage.removeItem("@session_token");
          Navigation.navigate("Registration");
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <View style={styles.container}>
      <Loader visible={loading} loadingMessage={"Logging out"} />
      <ProfileItem
        firstname={userInfo.first_name}
        lastname={userInfo.last_name}
        email={userInfo.email}
        buttonText={"Edit Profile"}
        onPress={() => {
          Navigation.navigate("Edit Profile", {
            firstname: userInfo.first_name,
            lastname: userInfo.last_name,
            email: userInfo.email,
          });
        }}
      />

      <Button title={"Log out"} onPress={logOut} style={{ margin: 24 }} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 40,
  },
});
