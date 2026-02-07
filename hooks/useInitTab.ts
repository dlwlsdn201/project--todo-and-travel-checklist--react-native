import { Category } from '@/model/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * @description 가장 마지막의 탭 상태를 localStorage 에 저장
 * @returns {Category | null} 가장 마지막의 탭 상태
 */
export const useInitTab = () => {
	const [initTabData, setInitTabData] = useState<Category | null>(null);
	const getTabData = async () => {
		try {
			const response = await AsyncStorage.getItem('selectedCategory');
			setInitTabData(response ? (response as Category) : null);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTabData();
	}, []);
	return initTabData;
};
