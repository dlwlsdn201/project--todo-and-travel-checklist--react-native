import { Category } from '@model/types';

export interface TodoPoint {
	type: Category;
	text: string;
	checked: boolean;
}
