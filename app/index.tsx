import { THEME_COLORS } from "@/theme/colors";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // const [selectedId,]
  return (
    <View style={styles.container}>
      <StatusBar barStyle='default' />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => console.log("Travel")}>
          {/* <TouchableOpacity> */}
          <Text style={styles.btnText}>Travel</Text>
          {/* </TouchableOpacity> */}
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: THEME_COLORS.background,
    marginTop: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnText: {
    color: THEME_COLORS.gray,
    fontSize: 38,
    fontWeight: "bold",
  },
});
