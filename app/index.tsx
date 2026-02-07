import { Header } from '@component/Header';
import { TextInput } from '@component/TextInput';
import { ToDoScrollList } from '@component/ToDoScrollList';
import { STORAGE_KEY } from '@config/localStorage';
import { useInitTab } from '@hooks/useInitTab';
import { TodoPoint } from '@model/data';
import { Category } from '@model/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_COLORS } from '@theme/colors';
import { saveToLocalStorage } from '@utils/localStorage';
import { useEffect, useState } from 'react';
import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native';

export default function App() {
	const [selectedCategory, setSelectedCategory] = useState<Category>('work');
	const [input, setInput] = useState<string>('');
	const [items, setItems] = useState<{ [key: string]: TodoPoint }>({});

	// 할 일 목록 로드
	const loadToDos = async () => {
		try {
			const storedDataString = await AsyncStorage.getItem(STORAGE_KEY);
			const storedItems = JSON.parse(storedDataString || '{}'); // string -> object

			setItems(storedItems);
		} catch (error) {
			console.error(error);
		}
	};

	// 할 일 추가
	const addItem = async () => {
		if (input.trim() !== '') {
			const latestItems = Object.assign({}, items, {
				[Date.now()]: { type: selectedCategory, text: input, checked: false },
			});
			setItems(latestItems);

			await saveToLocalStorage(latestItems);
			setInput('');
		}
	};

	// 할 일 삭제
	const deleteItem = async (key: string) => {
		const performDelete = async () => {
			const newToDos = { ...items };
			delete newToDos[key]; // key 와 매칭되는 object key 삭제

			setItems(newToDos); // 삭제할 item 이 제거된 최종 items 을 업데이트
			await saveToLocalStorage(newToDos); // 최종 items 을 localStorage 에 저장
		};

		if (Platform.OS === 'web') {
			if (window.confirm('데이터를 지우겠습니까?')) {
				await performDelete();
			}
			return;
		}

		Alert.alert('데이터 삭제', '데이터를 지우겠습니까?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				onPress: async () => {
					await performDelete();
				},
				style: 'destructive',
			},
		]);
	};

	const checkItem = async (key: string) => {
		const latestItems = Object.assign({}, items, {
			[key]: { ...items[key], checked: !items[key].checked },
		});
		setItems(latestItems);

		await saveToLocalStorage(latestItems);
	};

	// 가장 마지막의 탭 상태를 localStorage 에 저장
	const saveTabData = async (category: Category) => {
		try {
			await AsyncStorage.setItem('selectedCategory', category);
		} catch (error) {
			console.error(error);
		}
	};

	// 탭 변경 시 탭 상태를 localStorage 에 저장
	const changeTab = async (category: Category) => {
		setSelectedCategory(category);
		await saveTabData(category);
	};

	// 입력 데이터 편집 Mode 관리
	const handleEditForm = (key: string) => {
		if (Platform.OS === 'web') {
			const prevText = window.prompt(
				'수정할 내용을 입력하세요.',
				items[key]?.text ?? '',
			);
			if (prevText != null && prevText.trim() !== '') {
				const latestItems = Object.assign({}, items, {
					[key]: { ...items[key], text: prevText.trim() },
				});
				setItems(latestItems);

				// localStorage 에 저장
				saveToLocalStorage(latestItems);
			}
			return;
		}

		Alert.prompt('내용 수정', '수정할 내용을 입력하세요.', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Save',
				onPress: (prevText: string | undefined) => {
					if (prevText) {
						const latestItems = Object.assign({}, items, {
							[key]: { ...items[key], text: prevText },
						});
						setItems(latestItems);

						// localStorage 에 저장
						saveToLocalStorage(latestItems);
					}
				},
				style: 'default',
				isPreferred: true,
			},
		]);
	};

	const initTabData = useInitTab();
	useEffect(() => {
		loadToDos();

		if (typeof initTabData === 'string')
			setSelectedCategory(initTabData as Category);
	}, [initTabData]);

	return (
		<View style={styles.container}>
			{/* 스마트폰 최상단 상태 표시줄 (시간, 네트웤, 배터링 등) */}
			<StatusBar barStyle='default' />
			{/* 앱 헤더 (현재 선택된 탭 상태를 표시) */}
			<Header selectedCategory={selectedCategory} changeTab={changeTab} />
			{/* 텍스트 입력 UI (할 일 추가 기능) */}
			<TextInput
				value={input}
				onChangeText={setInput}
				onSubmitEditing={addItem}
				placeholder={
					selectedCategory === 'work'
						? 'Add a To Do'
						: 'Where do you want to go?'
				}
			/>
			{/* 할 일 목록 스크롤 컴포넌트 (할 일 목록 표시) */}
			<ToDoScrollList
				items={items}
				selectedCategory={selectedCategory}
				checkItem={checkItem}
				deleteItem={deleteItem}
				onEditPress={handleEditForm}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME_COLORS.bg,
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
});
