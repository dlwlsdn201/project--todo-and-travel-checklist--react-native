import { Category } from '@model/types';
import { THEME_COLORS } from '@theme/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
	// 현재 선택 상태인 탭
	selectedCategory: Category;
	// 탭 변경 핸들러
	changeTab: (category: Category) => void;
}

/**
 * @desc 앱 헤더 컴포넌트
 */
export const Header = ({ selectedCategory, changeTab }: HeaderProps) => {
	return (
		<View style={styles.header}>
			{/* onPress 가 준비되어 있는 컴포넌트 */}
			<TouchableOpacity activeOpacity={0.5} onPress={() => changeTab('work')}>
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
			<TouchableOpacity onPress={() => changeTab('travel')}>
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
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: THEME_COLORS.bg,
		marginTop: 100,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	btnText: {
		color: THEME_COLORS.gray,
		fontSize: 38,
		fontWeight: 'bold',
	},
});
