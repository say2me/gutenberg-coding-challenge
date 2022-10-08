/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Preview from './preview';

export default function Save( { attributes } ) {
	const { countryCode, relatedPosts } = attributes;
	return (
		<div { ...useBlockProps.save() }>
			<Preview
				countryCode={ countryCode }
				relatedPosts={ relatedPosts }
			/>
		</div>
	);
}
