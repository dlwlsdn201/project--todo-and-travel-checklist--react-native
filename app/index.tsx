import { THEME_COLORS } from "@/theme/colors";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  View,
} from "react-native";

type Category = "work" | "travel";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("work");
  return (
    <View style={styles.container}>
      <StatusBar barStyle='default' />
      <View style={styles.header}>
        {/* onPress 가 준비되어 있는 컴포넌트 */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSelectedCategory("work")}>
          <Text
            style={{
              ...styles.btnText,
              color:
                selectedCategory === "work"
                  ? THEME_COLORS.white
                  : THEME_COLORS.gray,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory("travel")}>
          <Text
            style={{
              ...styles.btnText,
              color:
                selectedCategory === "travel"
                  ? THEME_COLORS.white
                  : THEME_COLORS.gray,
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.bg,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: THEME_COLORS.bg,
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
