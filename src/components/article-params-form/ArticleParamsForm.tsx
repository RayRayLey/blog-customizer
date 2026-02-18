import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useRef, useContext, useEffect } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacer } from 'src/ui/spacer/Spacer';
import { Text } from 'src/ui/text';
import { FormContext } from 'src/index';

export const ArticleParamsForm = () => {
	const {
		open,
		handleClose,
		fontFamily,
		setFont,
		fontSize,
		setSize,
		fontColor,
		setColor,
		backgroundColor,
		setBackground,
		contentWidth,
		setWidth,
		applyChanges,
	} = useContext(FormContext);

	const asideRef = useRef<HTMLElement | null>(null);

	// выбор шрифта
	const handleFontChange = (newFont: OptionType) => {
		setFont(newFont);
	};

	// размер шрифта
	const handleSizeChange = (newSize: OptionType) => {
		setSize(newSize);
	};

	// выбор цвета шрифта
	const handleColorChange = (newColor: OptionType) => {
		setColor(newColor);
	};

	// цвет фона
	const handleBackgroundChange = (newBackground: OptionType) => {
		setBackground(newBackground);
	};

	// выбор ширины
	const handleWidthChange = (newWidth: OptionType) => {
		setWidth(newWidth);
	};

	const clearForm = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				open &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleClose} />
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
							htmlType='reset'
							type='clear'
							onClick={clearForm}
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
