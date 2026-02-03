import { THEME_COLORS } from '@/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	// TouchableWithoutFeedback,
	View,
} from 'react-native';

const STORAGE_KEY = 'toDos';

type Category = 'work' | 'travel';

interface Item {
	type: Category;
	text: string;
	checked: boolean;
}

export default function App() {
	const [selectedCategory, setSelectedCategory] = useState<Category>('work');
	const [input, setInput] = useState<string>('');
	const [items, setItems] = useState<{ [key: string]: Item }>({});

	const saveToDos = async (newItems: { [key: string]: Item }) => {
		try {
			const dataString = JSON.stringify(newItems); // object -> string

			await AsyncStorage.setItem(STORAGE_KEY, dataString);
		} catch (error) {
			console.error(error);
		}
	};

	const loadToDos = async () => {
		try {
			const storedDataString = await AsyncStorage.getItem(STORAGE_KEY);
			const storedItems = JSON.parse(storedDataString || '{}'); // string -> object

			setItems(storedItems);
		} catch (error) {
			console.error(error);
		}
	};

	const addItem = async () => {
		if (input.trim() !== '') {
			const latestItems = Object.assign({}, items, {
				[Date.now()]: { type: selectedCategory, text: input, checked: false },
			});
			setItems(latestItems);

			await saveToDos(latestItems);
			setInput('');
		}
	};

	const checkItem = async (key: string) => {
		const latestItems = Object.assign({}, items, {
			[key]: { ...items[key], checked: !items[key].checked },
		});
		setItems(latestItems);

		await saveToDos(latestItems);
	};

	useEffect(() => {
		loadToDos();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar barStyle='default' />
			<View style={styles.header}>
				{/* onPress 가 준비되어 있는 컴포넌트 */}
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => setSelectedCategory('work')}
				>
					<Text
						style={{
							...styles.btnText,
							color:
								selectedCategory === 'work'
									? THEME_COLORS.white
									: THEME_COLORS.gray,
						}}
					>
						Work
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setSelectedCategory('travel')}>
					<Text
						style={{
							...styles.btnText,
							color:
								selectedCategory === 'travel'
									? THEME_COLORS.white
									: THEME_COLORS.gray,
						}}
					>
						Travel
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholderTextColor={THEME_COLORS.lightGray}
					returnKeyType='go'
					placeholder={
						selectedCategory === 'work'
							? 'Add a To Do'
							: 'Where do you want to go?'
					}
					value={input}
					onChangeText={setInput}
					onSubmitEditing={addItem}
				/>
			</View>
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
						</Pressable>
					) : null,
				)}
			</ScrollView>
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
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
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
	btnText: {
		color: THEME_COLORS.gray,
		fontSize: 38,
		fontWeight: 'bold',
	},
	itemContainer: {
		flex: 1,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#ffffff92',
		marginTop: 20,
	},
	item: {
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
