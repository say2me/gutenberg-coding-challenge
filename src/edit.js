/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

import Preview from './preview';
import { getEmojiFlag, strippedRenderedExcerpt } from './utils';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { countryCode, relatedPosts } = attributes;
	const options = Object.keys( countries ).map( ( code ) => ( {
		value: code,
		label: `${ getEmojiFlag( code ) } ${ countries[ code ] } ${ code }`,
	} ) );

	const [ showPreview, setShowPreview ] = useState( !! countryCode );

	const selectedCountryPosts = useSelect(
		( select ) => {
			const currentPostId = select( 'core/editor' ).getCurrentPostId();

			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				search: countries[ countryCode ],
				exclude: currentPostId,
				_fields: [ 'id', 'title', 'excerpt', 'link' ],
			} );
		},
		[ countryCode ]
	);

	useEffect( () => {
		setShowPreview( !! countryCode );
	}, [ countryCode ] );

	useEffect( () => {
		setAttributes( {
			relatedPosts:
				selectedCountryPosts?.map( ( relatedPost ) => ( {
					...relatedPost,
					title: relatedPost.title?.rendered || relatedPost.link,
					excerpt: strippedRenderedExcerpt(
						relatedPost.excerpt?.rendered || ''
					),
				} ) ) || [],
		} );
	}, [ selectedCountryPosts, setAttributes ] );

	const handleChangeCountryCode = ( newCountryCode ) => {
		setAttributes( {
			countryCode: newCountryCode,
			relatedPosts: [],
		} );
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ () => {
							setShowPreview( false );
						} }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...useBlockProps() }>
				{ showPreview ? (
					<Preview
						countryCode={ countryCode }
						relatedPosts={ relatedPosts }
					/>
				) : (
					<Placeholder
						icon={ globe }
						label={ __( 'XWP Country Card', 'xwp-country-card' ) }
						isColumnLayout={ true }
						instructions={ __(
							'Type in a name of a contry you want to display on you site.',
							'xwp-country-card'
						) }
					>
						<ComboboxControl
							label={ __( 'Country', 'xwp-country-card' ) }
							hideLabelFromVision
							options={ options }
							value={ countryCode }
							onChange={ handleChangeCountryCode }
							allowReset={ true }
						/>
					</Placeholder>
				) }
			</div>
		</>
	);
}
