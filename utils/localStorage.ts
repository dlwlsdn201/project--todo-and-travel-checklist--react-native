import { STORAGE_KEY } from '@config/localStorage';
import { TodoPoint } from '@model/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 할 일 목록 저장
export const saveToLocalStorage = async (newItems: {
	[key: string]: TodoPoint;
}) => {
	try {
		const dataString = JSON.stringify(newItems); // object -> string

		await AsyncStorage.setItem(STORAGE_KEY, dataString);
	} catch (error) {
		console.error(error);
	}
};
