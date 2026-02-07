import { THEME_COLORS } from '@theme/colors';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	onSubmitEditing: () => void;
	placeholder: string;
}

/**
 * @desc 텍스트 입력 UI 컴포넌트
 * @param param0
 * @returns
 */
export const TextInput = ({
	value,
	onChangeText,
	onSubmitEditing,
	placeholder,
}: TextInputProps) => {
	return (
		<View style={styles.inputContainer}>
			<RNTextInput
				style={styles.input}
				placeholderTextColor={THEME_COLORS.lightGray}
				returnKeyType='go'
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
		gap: 20,
	},
	input: {
		flex: 1,
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		fontSize: 18,
	},
});
