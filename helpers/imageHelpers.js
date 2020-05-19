import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const openImageLib = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
  } else {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    return !result.cancelled ? result : false;
  }
};

export const openCam = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
  } else {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      allowsEditing: Platform.OS == "ios" ? false : true,
      aspect: [4, 3],
      base64: true,
    });
    return !result.cancelled ? result : false;
  }
};
