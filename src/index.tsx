import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, createContext, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type FormContextType = {
	open: boolean;
	handleClose: () => void;
	fontFamily: OptionType;
	setFont: (value: OptionType) => void;
	fontSize: OptionType;
	setSize: (value: OptionType) => void;
	fontColor: OptionType;
	setColor: (value: OptionType) => void;
	backgroundColor: OptionType;
	setBackground: (value: OptionType) => void;
	contentWidth: OptionType;
	setWidth: (value: OptionType) => void;
	formStyle: CSSProperties;
	applyChanges: () => void;
};

export const FormContext = createContext<FormContextType>({
	open: false,
	handleClose: () => {},
	fontFamily: defaultArticleState.fontFamilyOption,
	setFont: () => {},
	fontSize: defaultArticleState.fontSizeOption,
	setSize: () => {},
	fontColor: defaultArticleState.fontColor,
	setColor: () => {},
	backgroundColor: defaultArticleState.backgroundColor,
	setBackground: () => {},
	contentWidth: defaultArticleState.contentWidth,
	setWidth: () => {},
	formStyle: {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties,
	applyChanges: () => {},
});

const App = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen((prev) => !prev);
	// выбор шрифта
	const [fontFamily, setFont] = useState(defaultArticleState.fontFamilyOption);

	// размер шрифта
	const [fontSize, setSize] = useState(defaultArticleState.fontSizeOption);

	// выбор цвета шрифта
	const [fontColor, setColor] = useState(defaultArticleState.fontColor);

	// цвет фона
	const [backgroundColor, setBackground] = useState(
		defaultArticleState.backgroundColor
	);

	// выбор ширины
	const [contentWidth, setWidth] = useState(defaultArticleState.contentWidth);

	const [formStyle, setStyle] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	const applyChanges = () => {
		setStyle({
			'--font-family': fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		} as CSSProperties);
	};

	return (
		<FormContext.Provider
			value={{
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
				formStyle,
				applyChanges,
			}}>
			<main className={clsx(styles.main)} style={formStyle}>
				<ArticleParamsForm />
				<Article />
			</main>
		</FormContext.Provider>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
