import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, FormEvent, Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import { useClickOutside } from './hooks/useClickOutside';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	title: string;
	currentSettings: ArticleStateType;
	setCurrentSettings: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { currentSettings, setCurrentSettings } = props;
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);
	const ref = useRef<HTMLElement>(null);

	useClickOutside({
		isOpen: isSidebarOpen,
		rootRef: ref,
		onChange: setIsSidebarOpen,
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentSettings(formState);
	};

	const handleReset = () => {
		setCurrentSettings(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
				}}
			/>
			<aside
				ref={ref}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{props.title && (
						<>
							<Text weight={800} size={31} as={'h2'} uppercase>
								{props.title}
							</Text>
						</>
					)}
					<>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							title='Шрифт'
							onChange={(option) => {
								setFormState({
									...formState,
									fontFamilyOption: option,
								});
							}}></Select>
						<RadioGroup
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='Размер шрифта'
							name='Размер шрифта'
							onChange={(value) => {
								setFormState({
									...formState,
									fontSizeOption: value,
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
							selected={formState.backgroundColor}
							title='Цвет фона'
							onChange={(option) => {
								setFormState({
									...formState,
									backgroundColor: option,
								});
							}}></Select>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							title='Ширина контента'
							onChange={(option) => {
								setFormState({
									...formState,
									contentWidth: option,
								});
							}}></Select>
					</>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
