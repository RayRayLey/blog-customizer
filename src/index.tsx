import { createRoot } from 'react-dom/client';
import { StrictMode, useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formStyle, setStyle] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	return (
		<main className={clsx(styles.main)} style={formStyle}>
			<ArticleParamsForm change={setStyle} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
