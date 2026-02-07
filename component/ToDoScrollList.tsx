import { EditButton } from '@component/EditButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TodoPoint } from '@model/data';
import { Category } from '@model/types';
import { THEME_COLORS } from '@theme/colors';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ToDoScrollListProps {
	items: Record<string, TodoPoint>;
	selectedCategory: Category;
	checkItem: (key: string) => void;
	deleteItem: (key: string) => void;
	onEditPress: () => void;
}

/**
 * @desc 할 일 목록 스크롤 컴포넌트
 * @returns
 */
export const ToDoScrollList = ({
	items,
	selectedCategory,
	checkItem,
	deleteItem,
	onEditPress,
}: ToDoScrollListProps) => {
	return (
		<ScrollView style={styles.itemContainer}>
			{Object.entries(items).map(([key, item]) =>
				item.type === selectedCategory ? (
					<Pressable
						key={key}
						style={{
							...styles.item,
							backgroundColor: item.checked
								? THEME_COLORS.gray
								: THEME_COLORS.primary,
						}}
						onPress={() => checkItem(key)}
					>
						<Text
							style={{
								...styles.itemText,
								textDecorationLine: item.checked ? 'line-through' : 'none',
								color: item.checked
									? THEME_COLORS.secondaryText
									: THEME_COLORS.white,
							}}
						>
							{item.text}
						</Text>
						<View style={styles.actionButtonContainer}>
							<EditButton onPress={onEditPress} />
							<Pressable hitSlop={4} onPress={() => deleteItem(key)}>
								<FontAwesome
									name='trash-o'
									size={24}
									color={THEME_COLORS.deleteIconColor}
								/>
							</Pressable>
						</View>
					</Pressable>
				) : null,
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	actionButtonContainer: {
		flexDirection: 'row',
		gap: 14,
	},

	itemContainer: {
		marginTop: 20,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginTop: 10,
	},
	itemText: {
		fontSize: 18,
		fontWeight: 'bold',
		textDecorationStyle: 'solid',
		textDecorationLine: 'line-through',
		textDecorationColor: THEME_COLORS.white,
	},
});
