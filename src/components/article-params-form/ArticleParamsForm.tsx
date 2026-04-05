import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useCallback, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacer } from 'src/ui/spacer/Spacer';
import { Text } from 'src/ui/text';
import { ArticleFormClose } from '../article-form-close';

type ArticleParamsFormProp = {
	change: (value: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ change }: ArticleParamsFormProp) => {
	// изменение параметров формы
	const [formState, setFormState] = useState(defaultArticleState);
	
	const updateFormField = useCallback((field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	}, []);

	const clearArticle = () => {
		change({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});
	};

	const clearForm = () => {
		setFormState(defaultArticleState);
	};

	const applyChanges = () => {
		change({
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption: formState.fontSizeOption,
			fontColor: formState.fontColor,
			contentWidth: formState.contentWidth,
			backgroundColor: formState.backgroundColor,
		});
	};

	// открытие/закрытие формы
	const [open, setOpen] = useState(false);

	const buttonToggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, [open]);

	const asideRef = useRef<HTMLElement | null>(null);
	const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

	ArticleFormClose(open, () => setOpen(false), asideRef, buttonWrapperRef);

	return (
		<>
			<div ref={buttonWrapperRef}>
				<ArrowButton isOpen={open} onClick={buttonToggle} />
			</div>
			<aside
				ref={asideRef}
				className={
					open
						? `${styles.container_open} ${styles.container}`
						: styles.container
				}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacer />
					<Select
						title='Шрифт'
						onChange={updateFormField('fontFamilyOption')}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<Spacer />
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						options={fontSizeOptions}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Spacer />
					<Select
						title='Цвет шрифта'
						onChange={updateFormField('fontColor')}
						selected={formState.fontColor}
						options={fontColors}
					/>
					<Spacer />
					<Separator />
					<Spacer />
					<Select
						title='Цвет фона'
						onChange={updateFormField('backgroundColor')}
						selected={formState.backgroundColor}
						options={backgroundColors}
					/>
					<Spacer />
					<Select
						title='Ширина контента'
						onChange={updateFormField('contentWidth')}
						selected={formState.contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={() => {
								clearForm();
								clearArticle();
							}}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={applyChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
