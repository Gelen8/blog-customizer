import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, ReactNode, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { useClickOutside } from './hooks/useClickOutside';

type ArticleParamsFormProps = {
	content: ReactNode;
	title: string;
	onReset: () => void;
	onSubmit: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLElement>(null);

	useClickOutside({
		isOpen: open,
		rootRef: ref,
		onChange: setOpen,
	});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setOpen(!open);
				}}
			/>
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{props.title && (
						<>
							<Text weight={800} size={31} uppercase>
								{props.title}
							</Text>
						</>
					)}
					{props.content}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={props.onReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={props.onSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
