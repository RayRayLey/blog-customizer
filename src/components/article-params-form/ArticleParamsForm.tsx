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
} from 'src/constants/articleProps';
import {
	useRef,
	useEffect,
	useState,
	SetStateAction,
	CSSProperties,
	useCallback,
} from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacer } from 'src/ui/spacer/Spacer';
import { Text } from 'src/ui/text';

type ArticleParamsFormProp = {
	change: (value: SetStateAction<CSSProperties>) => void;
};

export const ArticleParamsForm = ({ change }: ArticleParamsFormProp) => {
	// выбор шрифта
	const [fontFamily, setFont] = useState(defaultArticleState.fontFamilyOption);
	const handleFontChange = useCallback((newFont: OptionType) => {
		setFont(newFont);
	}, []);

	// размер шрифта
	const [fontSize, setSize] = useState(defaultArticleState.fontSizeOption);
	const handleSizeChange = useCallback((newSize: OptionType) => {
		setSize(newSize);
	}, []);

	// выбор цвета шрифта
	const [fontColor, setColor] = useState(defaultArticleState.fontColor);
	const handleColorChange = useCallback((newColor: OptionType) => {
		setColor(newColor);
	}, []);

	// цвет фона
	const [backgroundColor, setBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const handleBackgroundChange = useCallback((newBackground: OptionType) => {
		setBackground(newBackground);
	}, []);

	// выбор ширины
	const [contentWidth, setWidth] = useState(defaultArticleState.contentWidth);
	const handleWidthChange = useCallback((newWidth: OptionType) => {
		setWidth(newWidth);
	}, []);

	// открытие формы
	const [open, setOpen] = useState(false);

	const buttonToggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, [open]);

	// закрытие
	const asideRef = useRef<HTMLElement | null>(null);
	const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!open) return;

			const target = event.target as Node;

			if (
				asideRef.current &&
				!asideRef.current.contains(target) &&
				buttonWrapperRef.current &&
				!buttonWrapperRef.current.contains(target)
			) {
				setOpen(false);
			}
		},
		[open, asideRef, buttonWrapperRef]
	);

	useEffect(() => {
		const handler = (event: MouseEvent) => handleClickOutside(event);

		if (open) {
			document.addEventListener('mousedown', handler);
		} else {
			document.removeEventListener('mousedown', handler);
		}

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, [open, handleClickOutside]);

	const clearArticle = () => {
		change({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		} as CSSProperties);
	};

	const clearForm = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);
	};

	const applyChanges = () => {
		change({
			'--font-family': fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		} as CSSProperties);
	};

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
						onChange={handleFontChange}
						selected={fontFamily}
						options={fontFamilyOptions}
					/>
					<Spacer />
					<RadioGroup
						name='fontSize'
						selected={fontSize}
						title='Размер шрифта'
						options={fontSizeOptions}
						onChange={handleSizeChange}
					/>
					<Spacer />
					<Select
						title='Цвет шрифта'
						onChange={handleColorChange}
						selected={fontColor}
						options={fontColors}
					/>
					<Spacer />
					<Separator />
					<Spacer />
					<Select
						title='Цвет фона'
						onChange={handleBackgroundChange}
						selected={backgroundColor}
						options={backgroundColors}
					/>
					<Spacer />
					<Select
						title='Ширина контента'
						onChange={handleWidthChange}
						selected={contentWidth}
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
