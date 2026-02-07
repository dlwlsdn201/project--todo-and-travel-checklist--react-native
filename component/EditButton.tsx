import AntDesign from '@expo/vector-icons/AntDesign';
import { THEME_COLORS } from '@theme/colors';
import { Pressable } from 'react-native';

export const EditButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<Pressable hitSlop={4} onPress={onPress}>
			<AntDesign name='edit' size={24} color={THEME_COLORS.iconDefault} />
		</Pressable>
	);
};
