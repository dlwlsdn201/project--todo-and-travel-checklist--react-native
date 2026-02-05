import { THEME_COLORS } from '@/theme/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';

export const EditButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<Pressable hitSlop={30} onPress={onPress}>
			<AntDesign name='edit' size={24} color={THEME_COLORS.iconDefault} />
		</Pressable>
	);
};
