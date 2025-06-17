import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type ArticleStateType = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

type FormStateType = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	containerWidth: OptionType;
	bgColor: OptionType;
};

const App = () => {
	const initialArticleSatate: ArticleStateType = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const initialFormState: FormStateType = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		containerWidth: contentWidthArr[0],
		bgColor: backgroundColors[0],
	};

	const [articleState, setArticleState] =
		useState<ArticleStateType>(initialArticleSatate);
	const [formState, setFormState] = useState<FormStateType>(initialFormState);

	return (
		<main className={clsx(styles.main)} style={articleState as CSSProperties}>
			<ArticleParamsForm
				title='Задайте параметры'
				content={
					<>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamily}
							title='Шрифт'
							onChange={(option) => {
								setFormState({
									...formState,
									fontFamily: option,
								});
							}}></Select>
						<RadioGroup
							options={fontSizeOptions}
							selected={formState.fontSize}
							title='Размер шрифта'
							name='Размер шрифта'
							onChange={(value) => {
								setFormState({
									...formState,
									fontSize: value,
								});
							}}></RadioGroup>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							title='Цвет шрифта'
							onChange={(option) => {
								setFormState({
									...formState,
									fontColor: option,
								});
							}}></Select>
						<Separator />
						<Select
							options={backgroundColors}
							selected={formState.bgColor}
							title='Цвет фона'
							onChange={(option) => {
								setFormState({
									...formState,
									bgColor: option,
								});
							}}></Select>
						<Select
							options={contentWidthArr}
							selected={formState.containerWidth}
							title='Ширина контента'
							onChange={(option) => {
								setFormState({
									...formState,
									containerWidth: option,
								});
							}}></Select>
					</>
				}
				onReset={() => {
					setFormState(initialFormState);
					setArticleState(initialArticleSatate);
				}}
				onSubmit={() => {
					const articleStyle: ArticleStateType = {
						'--font-family': formState.fontFamily.value,
						'--font-size': formState.fontSize.value,
						'--font-color': formState.fontColor.value,
						'--container-width': formState.containerWidth.value,
						'--bg-color': formState.bgColor.value,
					};
					setArticleState(articleStyle);
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
