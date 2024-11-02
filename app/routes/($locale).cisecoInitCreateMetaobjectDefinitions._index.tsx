import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useFetcher, useLoaderData} from '@remix-run/react';
import clsx from 'clsx';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import Input from '~/components/MyInput';
import {useState} from 'react';
import {CheckIcon} from '@heroicons/react/24/solid';
import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
import {CisecoSectionType} from '~/sections/Sections';
import ButtonSecondary from '~/components/Button/ButtonSecondary';

type CisecoMetaobjectDefinitionsT =
  | CisecoSectionType
  | 'ciseco--social'
  | 'ciseco--link'
  | 'ciseco--hero_item'
  | 'ciseco--client_say'
  | 'ciseco--route'
  | 'ciseco--collection_group';

export async function loader({params, context, request}: LoaderFunctionArgs) {
  return {
    env: context.env,
  };
}

const fetchMutationMetaobjectDefinitionItem = async ({
  storeDomain,
  shopify_Access_Token,
  input,
}: {
  storeDomain: string;
  shopify_Access_Token: string;
  input: Record<string, any>;
}) => {
  const fetchApi = await fetch(
    `https://${storeDomain}/admin/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopify_Access_Token.toString(),
      },
      body: JSON.stringify({
        query: `
          mutation($input: MetaobjectDefinitionCreateInput!) {
            metaobjectDefinitionCreate(definition: $input) {
              metaobjectDefinition {
                id
                type
                name
                fieldDefinitions {
                  key
                  name
                  type {
                    name
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            ...input,
            capabilities: {
              translatable: {enabled: true},
              publishable: {enabled: true},
            },
          },
        },
      }),
    },
  ).then((res) => res.json());

  return fetchApi;
};

const mutationMetaObjectDefinitionsFetchs = async ({
  otherFields,
  shopify_Access_Token,
  storeDomain,
}: {
  otherFields: {
    [k: string]: FormDataEntryValue;
  };
  shopify_Access_Token: string;
  storeDomain: string;
}) => {
  let RESULT: (Record<string, any> | null)[] = [];

  // 1. Create LINK metaobject definition -------------------------------------
  let metaobject_Link = null;
  let metaobject_Link_ID = otherFields['metaobject_done_created__ciseco--link'];
  if (!metaobject_Link_ID) {
    metaobject_Link = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Link',
        type: 'ciseco--link',
        description:
          'This definition includes the basic fields to display a link/button',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'text', type: 'single_line_text_field'},
          {key: 'href', type: 'single_line_text_field'},
          {key: 'icon_svg', name: 'icon svg', type: 'multi_line_text_field'},
          {
            key: 'target',
            type: 'boolean',
            description: 'True for open new tab, false for open same tab',
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_Link);
    metaobject_Link_ID =
      metaobject_Link?.data?.metaobjectDefinitionCreate?.metaobjectDefinition
        ?.id;

    if (
      metaobject_Link?.errors ||
      metaobject_Link?.userErrors ||
      !metaobject_Link_ID
    ) {
      return [...RESULT, {errors: 'Error when create metaobject_Link'}];
    }
  }

  // 2. Create SOCIAL metaobject definition -------------------------------------
  let metaobject_Social = null;
  if (!otherFields['metaobject_done_created__ciseco--social']) {
    metaobject_Social = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Social',
        type: 'ciseco--social',
        description:
          'This definition includes the basic fields to display a social link (It will display in the footer and in the sidebar mobile menu)',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'description', type: 'single_line_text_field'},
          {
            key: 'icon',
            type: 'file_reference',
            validations: {name: 'file_type_options', value: '["Image"]'},
          },
          {
            key: 'link',
            type: 'single_line_text_field',
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_Social);
    if (metaobject_Social?.errors || metaobject_Social?.userErrors) {
      return [...RESULT, {errors: 'Error when create metaobject_Social'}];
    }
  }

  // 3. Create HERO ITEM metaobject definition -------------------------------------
  let metaobject_HeroItem = null;
  let metaobject_HeroItem_ID =
    otherFields['metaobject_done_created__ciseco--hero_item'];
  if (!metaobject_HeroItem_ID) {
    metaobject_HeroItem = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Hero item',
        description:
          'A hero item. Sections | Hero and Sections | HeroSlider will contain one or many Hero item',
        type: 'ciseco--hero_item',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'heading', type: 'single_line_text_field'},
          {
            key: 'sub_heading',
            name: 'sub heading',
            type: 'single_line_text_field',
          },
          {
            name: 'horizontal image',
            key: 'horizontal_image',
            type: 'file_reference',
            validations: {name: 'file_type_options', value: '["Image"]'},
          },
          {
            name: 'vertical image',
            key: 'vertical_image',
            type: 'file_reference',
            validations: {name: 'file_type_options', value: '["Image"]'},
          },
          {
            name: 'cta button',
            key: 'cta_button',
            type: 'metaobject_reference',
            validations: {
              name: 'metaobject_definition_id',
              value: metaobject_Link_ID,
            },
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_HeroItem);

    metaobject_HeroItem_ID =
      metaobject_HeroItem?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;

    if (
      metaobject_HeroItem?.errors ||
      metaobject_HeroItem?.userErrors ||
      !metaobject_HeroItem_ID
    ) {
      return [...RESULT, {errors: 'Error when create metaobject_HeroItem'}];
    }
  }

  //  4. Create SECTION HERO metaobject definition -------------------------------------
  let metaobject_SectionHero = null;
  let metaobject_SectionHero_ID =
    otherFields['metaobject_done_created__ciseco--section_hero'];
  if (!metaobject_SectionHero_ID) {
    metaobject_SectionHero = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Section | Hero',
        type: 'ciseco--section_hero',
        description: 'A section with only one Hero item entry',
        displayNameKey: 'title',
        fieldDefinitions: [
          {
            key: 'title',
            type: 'single_line_text_field',
          },
          {
            name: 'hero item',
            key: 'hero_item',
            type: 'metaobject_reference',
            validations: {
              name: 'metaobject_definition_id',
              value: metaobject_HeroItem_ID,
            },
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionHero);

    metaobject_SectionHero_ID =
      metaobject_SectionHero?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionHero?.errors ||
      metaobject_SectionHero?.userErrors ||
      !metaobject_SectionHero_ID
    ) {
      return [...RESULT, {errors: 'Error when create metaobject_SectionHero'}];
    }
  }

  // 5. Create SECTION HERO SLIDER metaobject definition -------------------------------------
  let metaobject_SectionHeroSlider = null;
  let metaobject_SectionHeroSlider_ID =
    otherFields['metaobject_done_created__ciseco--section_hero_slider'];
  if (!metaobject_SectionHeroSlider_ID) {
    metaobject_SectionHeroSlider = (await fetchMutationMetaobjectDefinitionItem(
      {
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | HeroSlider',
          type: 'ciseco--section_hero_slider',
          description: 'A section with multiple Hero item entries',
          displayNameKey: 'title',
          fieldDefinitions: [
            {
              name: 'title',
              key: 'title',
              type: 'single_line_text_field',
            },
            {
              name: 'hero items',
              key: 'hero_items',
              type: 'list.metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_HeroItem_ID,
              },
            },
          ],
        },
      },
    )) as Record<string, any> | null;
    RESULT.push(metaobject_SectionHeroSlider);

    metaobject_SectionHeroSlider_ID =
      metaobject_SectionHeroSlider?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionHeroSlider?.errors ||
      metaobject_SectionHeroSlider?.userErrors ||
      !metaobject_SectionHeroSlider_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionHeroSlider'},
      ];
    }
  }

  // 6. Create CLIENT SAY metaobject definition, Section | Client will contain one or many Client Say entries -------------------------------------
  let metaobject_ClientSay = null;
  let metaobject_ClientSay_ID =
    otherFields['metaobject_done_created__ciseco--client_say'];
  if (!metaobject_ClientSay_ID) {
    metaobject_ClientSay = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Client Say',
        type: 'ciseco--client_say',
        description:
          'A client say. Section | Client will contain one or many Client Say entries',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'name', type: 'single_line_text_field'},
          {
            key: 'image',
            type: 'file_reference',
            validations: {name: 'file_type_options', value: '["Image"]'},
          },
          {key: 'content', type: 'multi_line_text_field'},
          {
            key: 'stars',
            type: 'number_integer',
            description: 'Number of stars. From 1 to 5',
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_ClientSay);

    metaobject_ClientSay_ID =
      metaobject_ClientSay?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_ClientSay?.errors ||
      metaobject_ClientSay?.userErrors ||
      !metaobject_ClientSay_ID
    ) {
      return [...RESULT, {errors: 'Error when create metaobject_ClientSay'}];
    }
  }

  // 7. Create SECTION CLIENTS SAY metaobject definition -------------------------------------
  let metaobject_SectionClientsSay = null;
  let metaobject_SectionClientsSay_ID =
    otherFields['metaobject_done_created__ciseco--section_clients_say'];
  if (!metaobject_SectionClientsSay_ID) {
    metaobject_SectionClientsSay = (await fetchMutationMetaobjectDefinitionItem(
      {
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | ClientsSay',
          type: 'ciseco--section_clients_say',
          description: 'A section with multiple Client Say entries',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {key: 'heading', type: 'single_line_text_field'},
            {
              key: 'sub_heading',
              name: 'sub heading',
              type: 'single_line_text_field',
            },
            {
              name: 'client says',
              key: 'clients_say',
              type: 'list.metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_ClientSay_ID,
              },
            },
          ],
        },
      },
    )) as Record<string, any> | null;
    RESULT.push(metaobject_SectionClientsSay);

    metaobject_SectionClientsSay_ID =
      metaobject_SectionClientsSay?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionClientsSay?.errors ||
      metaobject_SectionClientsSay?.userErrors ||
      !metaobject_SectionClientsSay_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionClientsSay'},
      ];
    }
  }

  // 8. Create SECTION LATEST BLOG metaobject definition -------------------------------------
  let metaobject_SectionLatestBlog = null;
  let metaobject_SectionLatestBlog_ID =
    otherFields['metaobject_done_created__ciseco--section_latest_blog'];
  if (!metaobject_SectionLatestBlog_ID) {
    metaobject_SectionLatestBlog = (await fetchMutationMetaobjectDefinitionItem(
      {
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | LatestBlog',
          type: 'ciseco--section_latest_blog',
          description: 'A section with latest blog posts.',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {
              name: 'blog slug',
              key: 'blog_slug',
              type: 'single_line_text_field',
              description: 'The slug of the blog. Default is "news"',
            },
            {
              name: 'heading bold',
              key: 'heading_bold',
              type: 'single_line_text_field',
            },
            {
              name: 'heading light',
              key: 'heading_light',
              type: 'single_line_text_field',
            },
            {
              name: 'background color',
              key: 'background_color',
              type: 'color',
            },
            {
              name: 'Number of items',
              key: 'number_of_items',
              type: 'number_integer',
            },
            {
              name: 'button view all',
              key: 'button_view_all',
              type: 'metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_Link_ID,
              },
            },
          ],
        },
      },
    )) as Record<string, any> | null;
    RESULT.push(metaobject_SectionLatestBlog);

    metaobject_SectionLatestBlog_ID =
      metaobject_SectionLatestBlog?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionLatestBlog?.errors ||
      metaobject_SectionLatestBlog?.userErrors ||
      !metaobject_SectionLatestBlog_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionLatestBlog'},
      ];
    }
  }

  // 9. Create SECTION GRID PRODUCTS AND FILTER metaobject definition - Section | GridProductsAndFilter -------------------------------------
  let metaobject_SectionGridProductsAndFilter = null;
  let metaobject_SectionGridProductsAndFilter_ID =
    otherFields[
      'metaobject_done_created__ciseco--section_grid_products_and_filter'
    ];
  if (!metaobject_SectionGridProductsAndFilter_ID) {
    metaobject_SectionGridProductsAndFilter =
      (await fetchMutationMetaobjectDefinitionItem({
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | GridProductsAndFilter',
          type: 'ciseco--section_grid_products_and_filter',
          description:
            'A section with grid products and filter. This section will display a grid of products and a filter to filter products.',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {key: 'heading', type: 'single_line_text_field'},
            {
              name: 'sub heading',
              key: 'sub_heading',
              type: 'single_line_text_field',
            },
            {
              name: 'hide filter',
              key: 'hide_filter',
              type: 'boolean',
            },
            {
              key: 'collection',
              description: 'The collection to display products',
              type: 'collection_reference',
            },
          ],
        },
      })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionGridProductsAndFilter);

    metaobject_SectionGridProductsAndFilter_ID =
      metaobject_SectionGridProductsAndFilter?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionGridProductsAndFilter?.errors ||
      metaobject_SectionGridProductsAndFilter?.userErrors ||
      !metaobject_SectionGridProductsAndFilter_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionGridProductsAndFilter'},
      ];
    }
  }

  // 10. Create COLLECTION GROUP metaobject definition - Collection Group -------------------------------------
  let metaobject_CollectionGroup = null;
  let metaobject_CollectionGroup_ID =
    otherFields['metaobject_done_created__ciseco--collection_group'];
  if (!metaobject_CollectionGroup_ID) {
    metaobject_CollectionGroup = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Collection Group',
        type: 'ciseco--collection_group',
        description:
          'A collection group. Section | TabsCollectionsByGroup will hold one or many Collection Group entries',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'name', type: 'single_line_text_field'},
          {
            name: 'icon svg',
            key: 'icon_svg',
            type: 'multi_line_text_field',
          },
          {
            key: 'collections',
            type: 'list.collection_reference',
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_CollectionGroup);

    metaobject_CollectionGroup_ID =
      metaobject_CollectionGroup?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_CollectionGroup?.errors ||
      metaobject_CollectionGroup?.userErrors ||
      !metaobject_CollectionGroup_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_CollectionGroup'},
      ];
    }
  }

  // 11. Create SECTION TABS COLLECTIONS BY GROUP metaobject definition - Section | TabsCollectionsByGroup -------------------------------------
  let metaobject_SectionTabsCollectionsByGroup = null;
  let metaobject_SectionTabsCollectionsByGroup_ID =
    otherFields[
      'metaobject_done_created__ciseco--section_tabs_collections_by_group'
    ];
  if (!metaobject_SectionTabsCollectionsByGroup_ID) {
    metaobject_SectionTabsCollectionsByGroup =
      (await fetchMutationMetaobjectDefinitionItem({
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | TabsCollectionsByGroup',
          type: 'ciseco--section_tabs_collections_by_group',
          description: 'A section with tabs of collections by group',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {key: 'heading', type: 'single_line_text_field'},
            {
              name: 'sub heading',
              key: 'sub_heading',
              type: 'single_line_text_field',
            },
            {
              name: 'number collections to show',
              key: 'number_collections_to_show',
              type: 'number_integer',
            },
            {
              name: 'collection groups',
              key: 'collection_groups',
              type: 'list.metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_CollectionGroup_ID,
              },
            },
            {
              name: 'card style',
              key: 'card_style',
              description: 'The style of the card (1,4 or 6). Default is 4',
              type: 'number_integer',
            },
            {
              name: 'background color',
              key: 'background_color',
              type: 'color',
            },
          ],
        },
      })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionTabsCollectionsByGroup);

    metaobject_SectionTabsCollectionsByGroup_ID =
      metaobject_SectionTabsCollectionsByGroup?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionTabsCollectionsByGroup?.errors ||
      metaobject_SectionTabsCollectionsByGroup?.userErrors ||
      !metaobject_SectionTabsCollectionsByGroup_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionTabsCollectionsByGroup'},
      ];
    }
  }

  // 12. Create SECTION IMAGE WITH TEXT metaobject definition - Section | ImageWithText -------------------------------------
  let metaobject_SectionImageWithText = null;
  let metaobject_SectionImageWithText_ID =
    otherFields['metaobject_done_created__ciseco--section_image_with_text'];
  if (!metaobject_SectionImageWithText_ID) {
    metaobject_SectionImageWithText =
      (await fetchMutationMetaobjectDefinitionItem({
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | ImageWithText',
          type: 'ciseco--section_image_with_text',
          description: 'A section with a side image and a side text',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {
              name: 'image',
              key: 'image',
              type: 'file_reference',
              validations: {name: 'file_type_options', value: '["Image"]'},
            },
            {
              name: 'hide logo',
              key: 'hide_logo',
              type: 'boolean',
            },
            {key: 'heading', type: 'single_line_text_field'},
            {key: 'content', type: 'multi_line_text_field'},
            {
              name: 'button 1',
              key: 'button_1',
              type: 'metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_Link_ID,
              },
            },
            {
              name: 'button 2',
              key: 'button_2',
              type: 'metaobject_reference',
              validations: {
                name: 'metaobject_definition_id',
                value: metaobject_Link_ID,
              },
            },
            {
              name: 'background color',
              key: 'background_color',
              type: 'color',
            },
            {
              name: 'features',
              key: 'features',
              type: 'list.single_line_text_field',
            },
            {
              name: 'Show Subscribers input',
              key: 'show_subscribers_input',
              type: 'boolean',
            },
            {
              name: 'style',
              key: 'style',
              type: 'number_integer',
              description: '1,2 or 3. Default is 1',
            },
          ],
        },
      })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionImageWithText);

    metaobject_SectionImageWithText_ID =
      metaobject_SectionImageWithText?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionImageWithText?.errors ||
      metaobject_SectionImageWithText?.userErrors ||
      !metaobject_SectionImageWithText_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionImageWithText'},
      ];
    }
  }

  // 13. Create SECTION STEPS metaobject definition - Section | Steps -------------------------------------
  let metaobject_SectionSteps = null;
  let metaobject_SectionSteps_ID =
    otherFields['metaobject_done_created__ciseco--section_steps'];
  if (!metaobject_SectionSteps_ID) {
    metaobject_SectionSteps = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Section | Steps',
        type: 'ciseco--section_steps',
        description: 'A section with steps',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {
            name: 'labels',
            key: 'labels',
            description: 'Label for each step in turn.',
            type: 'list.single_line_text_field',
          },
          {
            key: 'icons',
            description: 'Icon for each step in turn.',
            type: 'list.file_reference',
            validations: {name: 'file_type_options', value: '["Image"]'},
          },
          {
            key: 'headings',
            description: 'Heading for each step in turn.',
            type: 'list.single_line_text_field',
          },
          {
            key: 'contents',
            description: 'Content for each step in turn.',
            type: 'list.single_line_text_field',
          },
          {
            key: 'style',
            description: 'Enter 1 or 2 to select the style for the section.',
            type: 'number_integer',
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionSteps);

    metaobject_SectionSteps_ID =
      metaobject_SectionSteps?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionSteps?.errors ||
      metaobject_SectionSteps?.userErrors ||
      !metaobject_SectionSteps_ID
    ) {
      return [...RESULT, {errors: 'Error when create metaobject_SectionSteps'}];
    }
  }

  // 14. Create SECTION PRODUCTS SLIDER metaobject definition - Section | ProductsSlider -------------------------------------
  let metaobject_SectionProductsSlider = null;
  let metaobject_SectionProductsSlider_ID =
    otherFields['metaobject_done_created__ciseco--section_products_slider'];
  if (!metaobject_SectionProductsSlider_ID) {
    metaobject_SectionProductsSlider =
      (await fetchMutationMetaobjectDefinitionItem({
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | ProductsSlider',
          type: 'ciseco--section_products_slider',
          description: 'A section with a slider of products',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {
              name: 'heading bold',
              key: 'heading_bold',
              type: 'single_line_text_field',
            },
            {
              name: 'heading light',
              key: 'heading_light',
              type: 'single_line_text_field',
            },
            {
              name: 'sub heading',
              key: 'sub_heading',
              type: 'single_line_text_field',
            },
            {
              name: 'body',
              key: 'body',
              type: 'multi_line_text_field',
            },
            {
              key: 'collection',
              type: 'collection_reference',
            },
            {
              key: 'style',
              description: 'Enter 1 or 2 to select the style for the section.',
              type: 'number_integer',
            },
          ],
        },
      })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionProductsSlider);

    metaobject_SectionProductsSlider_ID =
      metaobject_SectionProductsSlider?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionProductsSlider?.errors ||
      metaobject_SectionProductsSlider?.userErrors ||
      !metaobject_SectionProductsSlider_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionProductsSlider'},
      ];
    }
  }

  // 15. Create SECTION COLLECTIONS SLIDER metaobject definition - Section | CollectionsSlider -------------------------------------
  let metaobject_SectionCollectionsSlider = null;
  let metaobject_SectionCollectionsSlider_ID =
    otherFields['metaobject_done_created__ciseco--section_collections_slider'];
  if (!metaobject_SectionCollectionsSlider_ID) {
    metaobject_SectionCollectionsSlider =
      (await fetchMutationMetaobjectDefinitionItem({
        storeDomain,
        shopify_Access_Token,
        input: {
          name: 'Section | CollectionsSlider',
          type: 'ciseco--section_collections_slider',
          description: 'A section with a slider of collections',
          displayNameKey: 'title',
          fieldDefinitions: [
            {key: 'title', type: 'single_line_text_field'},
            {
              name: 'heading bold',
              key: 'heading_bold',
              type: 'single_line_text_field',
            },
            {
              name: 'heading light',
              key: 'heading_light',
              type: 'single_line_text_field',
            },
            {
              name: 'sub heading',
              key: 'sub_heading',
              type: 'single_line_text_field',
            },
            {key: 'collections', type: 'list.collection_reference'},
            {
              name: 'button text',
              key: 'button_text',
              description:
                'The text of the button in item. Default is View all',
              type: 'single_line_text_field',
            },
          ],
        },
      })) as Record<string, any> | null;
    RESULT.push(metaobject_SectionCollectionsSlider);

    metaobject_SectionCollectionsSlider_ID =
      metaobject_SectionCollectionsSlider?.data?.metaobjectDefinitionCreate
        ?.metaobjectDefinition?.id;
    if (
      metaobject_SectionCollectionsSlider?.errors ||
      metaobject_SectionCollectionsSlider?.userErrors ||
      !metaobject_SectionCollectionsSlider_ID
    ) {
      return [
        ...RESULT,
        {errors: 'Error when create metaobject_SectionCollectionsSlider'},
      ];
    }
  }

  // 16. Create ROUTE metaobject definition - Route -------------------------------------
  let metaobject_Route = null;
  const metaobject_Route_ID =
    otherFields['metaobject_done_created__ciseco--route'];

  if (!metaobject_Route_ID) {
    if (
      !metaobject_SectionHero_ID ||
      !metaobject_SectionHeroSlider_ID ||
      !metaobject_SectionClientsSay_ID ||
      !metaobject_SectionLatestBlog_ID ||
      !metaobject_SectionGridProductsAndFilter_ID ||
      !metaobject_SectionTabsCollectionsByGroup_ID ||
      !metaobject_SectionImageWithText_ID ||
      !metaobject_SectionSteps_ID ||
      !metaobject_SectionProductsSlider_ID ||
      !metaobject_SectionCollectionsSlider_ID
    ) {
      return [
        ...RESULT,
        {
          Error:
            'Error when create metaobject_Route, missing some Section metaobject ID',
        },
      ];
    }

    metaobject_Route = (await fetchMutationMetaobjectDefinitionItem({
      storeDomain,
      shopify_Access_Token,
      input: {
        name: 'Route',
        type: 'ciseco--route',
        description:
          'A route. This definition includes the basic fields to create a route',
        displayNameKey: 'title',
        fieldDefinitions: [
          {key: 'title', type: 'single_line_text_field'},
          {key: 'description', type: 'single_line_text_field'},
          {
            key: 'padding_top_px',
            name: 'Padding top (px)',
            type: 'number_integer',
          },
          {
            key: 'firt_line_on_top',
            name: 'Firt line on top',
            type: 'boolean',
          },
          {
            key: 'separation_line_between_sections',
            name: 'Separation line between sections',
            type: 'boolean',
          },
          {
            key: 'sections',
            type: 'list.mixed_reference',
            validations: {
              name: 'metaobject_definition_ids',
              value: `["${metaobject_SectionHero_ID}","${metaobject_SectionHeroSlider_ID}","${metaobject_SectionClientsSay_ID}","${metaobject_SectionLatestBlog_ID}","${metaobject_SectionGridProductsAndFilter_ID}","${metaobject_SectionTabsCollectionsByGroup_ID}","${metaobject_SectionImageWithText_ID}","${metaobject_SectionSteps_ID}","${metaobject_SectionProductsSlider_ID}","${metaobject_SectionCollectionsSlider_ID}"]`,
            },
          },
        ],
      },
    })) as Record<string, any> | null;
    RESULT.push(metaobject_Route);

    if (metaobject_Route?.errors || metaobject_Route?.userErrors) {
      return [...RESULT, {errors: 'Error when create metaobject_Route'}];
    }
  }

  //
  // END
  return RESULT;
};

const mutaionMetafieldDefinitionsFetchs = async ({
  otherFields,
  shopify_Access_Token,
  storeDomain,
}: {
  otherFields: {
    [k: string]: FormDataEntryValue;
  };
  shopify_Access_Token: string;
  storeDomain: string;
}) => {
  const metafields_need_create = [
    otherFields['collection_mtf_horizontal_image']
      ? {
          name: 'Horizontal Image',
          key: 'horizontal_image',
          namespace: 'ciseco--collection',
          type: 'file_reference',
          ownerType: 'COLLECTION',
          description: 'A horizontal image for the collection.',
          validations: {name: 'file_type_options', value: '["Image"]'},
        }
      : null,
    otherFields['product_mtf_outstanding_features']
      ? {
          name: 'Outstanding Features',
          key: 'outstanding_features',
          namespace: 'ciseco--product',
          type: 'list.single_line_text_field',
          ownerType: 'PRODUCT',
          description: 'A list of outstanding features of the product.',
        }
      : null,
  ].filter(Boolean);

  const fetch2_create_metafield_definitions = Promise.all(
    metafields_need_create.map(
      (metafield) =>
        fetch(`https://${storeDomain}/admin/api/2024-04/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': shopify_Access_Token.toString(),
          },
          body: JSON.stringify({
            query: `
            mutation($definition: MetafieldDefinitionInput!) {
              metafieldDefinitionCreate(definition: $definition) {
                createdDefinition {
                  id
                  name
                  namespace
                  key 
                }
                userErrors {
                  field
                  message
                  code
                }
              }
            }
            `,
            variables: {
              definition: {
                name: metafield.name,
                namespace: metafield.namespace,
                key: metafield.key,
                description: metafield.description,
                ownerType: metafield.ownerType,
                pin: true,
                type: metafield.type,
                validations: metafield.validations,
              },
            },
          }),
        }).then((res) => res.json()) as Promise<Record<string, any> | null>,
    ),
  );

  return fetch2_create_metafield_definitions;
};

const fetchImportMetaobjectEntriesItem = async ({
  shopify_Access_Token,
  storeDomain,
  metaobject,
}: {
  shopify_Access_Token: string;
  storeDomain: string;
  metaobject: Record<string, any>;
}) => {
  const import_data = await fetch(
    `https://${storeDomain}/admin/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopify_Access_Token.toString(),
      },
      body: JSON.stringify({
        query: `
            mutation($metaobject: MetaobjectCreateInput!) {
              metaobjectCreate(metaobject: $metaobject) {
                metaobject {
                  id
                  type
                  displayName
                  handle
                }
              }
            }
          `,
        variables: {
          metaobject: {
            ...metaobject,
            capabilities: {publishable: {status: 'ACTIVE'}},
          },
        },
      }),
    },
  ).then((res) => res.json());
  return import_data as Record<string, any> | null;
};

const fetchImportMetaobjectEntries = async ({
  otherFields,
  shopify_Access_Token,
  storeDomain,
}: {
  otherFields: {
    [k: string]: FormDataEntryValue;
  };
  shopify_Access_Token: string;
  storeDomain: string;
}) => {
  let RESULT: (Record<string, any> | null)[] = [];

  // -1. fetch all metaobject definitions current exist -------------------------------------
  const METAOBJECT_TYPES: CisecoMetaobjectDefinitionsT[] = [
    'ciseco--link',
    'ciseco--social',
    'ciseco--hero_item',
    'ciseco--section_hero',
    'ciseco--section_hero_slider',
    'ciseco--client_say',
    'ciseco--section_clients_say',
    'ciseco--section_latest_blog',
    'ciseco--section_grid_products_and_filter',
    'ciseco--collection_group',
    'ciseco--section_tabs_collections_by_group',
    'ciseco--section_image_with_text',
    'ciseco--section_steps',
    'ciseco--section_products_slider',
    'ciseco--section_collections_slider',
    'ciseco--route',
  ];

  const promise_allCisecoMetaobjectEntries = Promise.all(
    METAOBJECT_TYPES.map(
      async (type) =>
        fetch(`https://${storeDomain}/admin/api/2024-04/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': shopify_Access_Token.toString(),
          },
          body: JSON.stringify({
            query: `
            query($type: String!) {
              metaobjects(type: $type, first: 250) {
                nodes {
                  id
                  handle
                  type
                  displayName
                }
              }
            }
            `,
            variables: {
              type,
            },
          }),
        }).then((res) => res.json()) as Promise<Record<string, any> | null>,
    ),
  );

  // 0. fetch image files -------------------------------------
  const IMAGE_FILES_NAMES = [
    'ciseco_client_say_1',
    'ciseco_client_say_2',
    'ciseco_client_say_3',
    'ciseco_client_say_4',
    'ciseco_client_say_5',
    'ciseco_client_say_6',
    'ciseco_client_say_7',
    'ciseco_hero_home2_H',
    'ciseco_hero_home2_V',
    'ciseco_hero_slider_H_1',
    'ciseco_hero_slider_H_2',
    'ciseco_hero_slider_H_3',
    'ciseco_hero_slider_V_1',
    'ciseco_hero_slider_V_2',
    'ciseco_hero_slider_V_3',
    'ciseco_HIW1img',
    'ciseco_HIW2img',
    'ciseco_HIW3img',
    'ciseco_HIW4img',
    'ciseco_img_with_text_1',
    'ciseco_img_with_text_2',
    'ciseco_img_with_text_3',
    'ciseco_img_with_text_4',
    'ciseco_socials_facebook',
    'ciseco_socials_tiktok',
    'ciseco_socials_twitter',
  ] as const;

  const promise_cisecoImageFiles = Promise.all(
    IMAGE_FILES_NAMES.map(
      async (filename) =>
        fetch(`https://${storeDomain}/admin/api/2024-04/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': shopify_Access_Token.toString(),
          },
          body: JSON.stringify({
            query: `
            query($query: String) {
              files(query: $query, first: 1) {
                nodes {
                  id
                }
              }
            }
            `,
            variables: {
              query: `filename:${filename}`,
            },
          }),
        }).then((res) => res.json()) as Record<string, any> | null,
    ),
  );

  const allCisecoMetaobjectEntries__ = await promise_allCisecoMetaobjectEntries;
  const cisecoImageFiles__ = await promise_cisecoImageFiles;

  // get ciseo metaobject entries
  const allCisecoMetaobjectEntries = allCisecoMetaobjectEntries__.map(
    (res) => res?.data?.metaobjects?.nodes,
  );
  // get image file ids
  const cisecoImageFiles = cisecoImageFiles__.map(
    (res) => res?.data?.files?.nodes?.[0]?.id as string | null,
  );

  RESULT = [...RESULT, allCisecoMetaobjectEntries, cisecoImageFiles__];

  // filename is one of IMAGE_FILES_NAMES, get type of filename

  const getImageIDByFilename = (
    filename: (typeof IMAGE_FILES_NAMES)[number],
  ) => {
    const index = IMAGE_FILES_NAMES.indexOf(filename);
    return cisecoImageFiles[index] || '';
  };

  // check if a metaobject entry exist by type and handle
  const getEntryIDByTypeAndHandle = (
    type: CisecoMetaobjectDefinitionsT,
    handle: string,
  ) => {
    const entries = allCisecoMetaobjectEntries[METAOBJECT_TYPES.indexOf(type)];
    const entry = entries?.find(
      (entry: {handle: string}) => entry.handle === handle,
    );
    return entry?.id as string | null;
  };

  // 1. Import Link and Social metaobject entries -------------------------------------
  let Link_ExploreNow_ID = getEntryIDByTypeAndHandle(
    'ciseco--link',
    'explore-now',
  );
  let Link_SavingsCombo_ID = getEntryIDByTypeAndHandle(
    'ciseco--link',
    'savings-combo',
  );
  let Link_DiscoverMore_ID = getEntryIDByTypeAndHandle(
    'ciseco--link',
    'discover-more',
  );
  const import_Links_and_Socials = await Promise.all([
    // links
    // 1.1 Link Explore now
    !Link_ExploreNow_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--link',
            fields: [
              {key: 'title', value: 'Explore now'},
              {key: 'text', value: 'Explore now'},
              {key: 'href', value: '/seach'},
              {key: 'target', value: 'false'},
              {
                key: 'icon_svg',
                value:
                  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 22L20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
              },
            ],
          },
        })
      : null,
    // 1.2 Link Savings combo
    !Link_SavingsCombo_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--link',
            fields: [
              {key: 'title', value: 'Savings combo'},
              {key: 'text', value: 'Savings combo'},
              {key: 'href', value: '/'},
              {key: 'target', value: 'false'},
            ],
          },
        })
      : null,
    // 1.3 Link Discover more
    !Link_DiscoverMore_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--link',
            fields: [
              {key: 'title', value: 'Discover more'},
              {key: 'text', value: 'Discover more'},
              {key: 'href', value: '/seach'},
              {key: 'target', value: 'false'},
            ],
          },
        })
      : null,

    // socials
    // 1.4 Social Facebook
    !getEntryIDByTypeAndHandle('ciseco--social', 'facebook')
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--social',
            fields: [
              {key: 'title', value: 'Facebook'},
              {
                key: 'icon',
                value: getImageIDByFilename('ciseco_socials_facebook'),
              },
              {key: 'link', value: 'https://www.facebook.com'},
            ],
          },
        })
      : null,
    // 1.5 Social Twitter
    !getEntryIDByTypeAndHandle('ciseco--social', 'twitter')
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--social',
            fields: [
              {key: 'title', value: 'Twitter'},
              {
                key: 'icon',
                value: getImageIDByFilename('ciseco_socials_twitter'),
              },
              {key: 'link', value: 'https://www.twitter.com'},
            ],
          },
        })
      : null,
    // 1.6 Social Tiktok
    !getEntryIDByTypeAndHandle('ciseco--social', 'tiktok')
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--social',
            fields: [
              {key: 'title', value: 'Tiktok'},
              {
                key: 'icon',
                value: getImageIDByFilename('ciseco_socials_tiktok'),
              },
              {key: 'link', value: 'https://www.instagram.com'},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_Links_and_Socials];
  Link_DiscoverMore_ID =
    import_Links_and_Socials[2]?.data?.metaobjectCreate?.metaobject?.id ||
    Link_DiscoverMore_ID;
  Link_ExploreNow_ID =
    import_Links_and_Socials[0]?.data?.metaobjectCreate?.metaobject?.id ||
    Link_ExploreNow_ID;
  Link_SavingsCombo_ID =
    import_Links_and_Socials[1]?.data?.metaobjectCreate?.metaobject?.id ||
    Link_SavingsCombo_ID;
  if (!Link_DiscoverMore_ID || !Link_ExploreNow_ID || !Link_SavingsCombo_ID) {
    return [
      ...RESULT,
      {
        errors: 'Error when create Link metaobject entries.',
        import_Links_and_Socials,
      },
    ];
  }
  //

  // 2. Import Hero items -------------------------------------
  let HeroItem_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--hero_item',
    'hero-item-1',
  );
  let HeroItem_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--hero_item',
    'hero-item-2',
  );
  let HeroItem_3_ID = getEntryIDByTypeAndHandle(
    'ciseco--hero_item',
    'hero-item-3',
  );
  let HeroItem_4_home_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--hero_item',
    'hero-item-4-home-2',
  );
  const import_HeroItems = await Promise.all([
    // 2.1 Hero item 1
    !HeroItem_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--hero_item',
            fields: [
              {key: 'title', value: 'Hero item 1'},
              {
                key: 'heading',
                value: 'Exclusive collection <br /> for everyone',
              },
              {key: 'sub_heading', value: 'In this season, find the best 🔥'},
              {
                key: 'horizontal_image',
                value: getImageIDByFilename('ciseco_hero_slider_H_1'),
              },
              {
                key: 'vertical_image',
                value: getImageIDByFilename('ciseco_hero_slider_V_1'),
              },
              {key: 'cta_button', value: Link_ExploreNow_ID},
            ],
          },
        })
      : null,

    // 2.2 Hero item 2
    !HeroItem_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--hero_item',
            fields: [
              {key: 'title', value: 'Hero item 2'},
              {
                key: 'heading',
                value: 'Exclusive collection <br /> for everyone',
              },
              {key: 'sub_heading', value: 'In this season, find the best 🔥'},
              {
                key: 'horizontal_image',
                value: getImageIDByFilename('ciseco_hero_slider_H_2'),
              },
              {
                key: 'vertical_image',
                value: getImageIDByFilename('ciseco_hero_slider_V_2'),
              },
              {key: 'cta_button', value: Link_ExploreNow_ID},
            ],
          },
        })
      : null,

    // 2.3 Hero item 3
    !HeroItem_3_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--hero_item',
            fields: [
              {key: 'title', value: 'Hero item 3'},
              {
                key: 'heading',
                value: 'Exclusive collection <br /> for everyone',
              },
              {key: 'sub_heading', value: 'In this season, find the best 🔥'},
              {
                key: 'horizontal_image',
                value: getImageIDByFilename('ciseco_hero_slider_H_3'),
              },
              {
                key: 'vertical_image',
                value: getImageIDByFilename('ciseco_hero_slider_V_3'),
              },
              {key: 'cta_button', value: Link_ExploreNow_ID},
            ],
          },
        })
      : null,

    // 2.4 Hero item 4 home 2
    !HeroItem_4_home_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--hero_item',
            fields: [
              {key: 'title', value: 'Hero item 4 home 2'},
              {
                key: 'heading',
                value: 'Exclusive collection <br /> for everyone',
              },
              {key: 'sub_heading', value: 'In this season, find the best 🔥'},
              {
                key: 'horizontal_image',
                value: getImageIDByFilename('ciseco_hero_home2_H'),
              },
              {
                key: 'vertical_image',
                value: getImageIDByFilename('ciseco_hero_home2_V'),
              },
              {key: 'cta_button', value: Link_ExploreNow_ID},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_HeroItems];
  HeroItem_1_ID =
    import_HeroItems[0]?.data?.metaobjectCreate?.metaobject?.id ||
    HeroItem_1_ID;
  HeroItem_2_ID =
    import_HeroItems[1]?.data?.metaobjectCreate?.metaobject?.id ||
    HeroItem_2_ID;
  HeroItem_3_ID =
    import_HeroItems[2]?.data?.metaobjectCreate?.metaobject?.id ||
    HeroItem_3_ID;
  HeroItem_4_home_2_ID =
    import_HeroItems[3]?.data?.metaobjectCreate?.metaobject?.id ||
    HeroItem_4_home_2_ID;

  if (
    !HeroItem_1_ID ||
    !HeroItem_2_ID ||
    !HeroItem_3_ID ||
    !HeroItem_4_home_2_ID
  ) {
    return [
      ...RESULT,
      {
        errors: 'Error when create Hero items metaobject entries.',
        import_HeroItems,
      },
    ];
  }

  // 3. Import Section Hero -------------------------------------
  let SectionHero_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_hero',
    'section-hero-for-home-2',
  );
  const import_SectionHeros = await Promise.all([
    !SectionHero_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_hero',
            fields: [
              {key: 'title', value: 'Section Hero for home 2'},
              {key: 'hero_item', value: HeroItem_4_home_2_ID},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionHeros];
  SectionHero_ID =
    import_SectionHeros[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionHero_ID;
  if (!SectionHero_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Hero metaobject entries.'},
    ];
  }

  // 4. Import Section Hero Slider -------------------------------------
  let SectionHeroSlider_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_hero_slider',
    'section-hero-slider-for-home',
  );
  const import_SectionHeroSliders = await Promise.all([
    !SectionHeroSlider_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_hero_slider',
            fields: [
              {key: 'title', value: 'Section Hero Slider for home'},
              {
                key: 'hero_items',
                value: `["${HeroItem_1_ID}", "${HeroItem_2_ID}", "${HeroItem_3_ID}"]`,
              },
            ],
          },
        })
      : null,
  ]);

  RESULT = [...RESULT, ...import_SectionHeroSliders];
  SectionHeroSlider_ID =
    import_SectionHeroSliders[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionHeroSlider_ID;
  if (!SectionHeroSlider_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Hero Slider metaobject entries.'},
    ];
  }

  // 5. Import Client Say -------------------------------------
  let ClientSay_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-1',
  );
  let ClientSay_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-2',
  );
  let ClientSay_3_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-3',
  );
  let ClientSay_4_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-4',
  );
  let ClientSay_5_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-5',
  );
  let ClientSay_6_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-6',
  );
  let ClientSay_7_ID = getEntryIDByTypeAndHandle(
    'ciseco--client_say',
    'client-say-7',
  );

  const import_ClientSays = await Promise.all([
    // 5.1 Client say 1
    !ClientSay_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 1'},
              {key: 'name', value: 'Lazuli Luxe'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_1'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,
    // 5.2 Client say 2
    !ClientSay_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 2'},
              {key: 'name', value: 'Bright Ltd'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_2'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,
    // 5.3 Client say 3
    !ClientSay_3_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 3'},
              {key: 'name', value: 'La Lujosa'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_3'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,

    // 5.4 Client say 4
    !ClientSay_4_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 4'},
              {key: 'name', value: 'La Virianza'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_4'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,

    // 5.5 Client say 5
    !ClientSay_5_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 5'},
              {key: 'name', value: 'La Davino'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_5'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,

    // 5.6 Client say 6
    !ClientSay_6_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 6'},
              {key: 'name', value: 'Coin Tainer'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_6'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,

    // 5.7 Client say 7
    !ClientSay_7_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--client_say',
            fields: [
              {key: 'title', value: 'Client say 7'},
              {key: 'name', value: 'Luxurious Dazzling'},
              {
                key: 'content',
                value:
                  'Great quality products, affordable prices, fast and friendly delivery. I very much recommend it.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_client_say_3'),
              },
              {key: 'stars', value: '5'},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_ClientSays];

  ClientSay_1_ID =
    import_ClientSays[0]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_1_ID;
  ClientSay_2_ID =
    import_ClientSays[1]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_2_ID;
  ClientSay_3_ID =
    import_ClientSays[2]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_3_ID;
  ClientSay_4_ID =
    import_ClientSays[3]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_4_ID;
  ClientSay_5_ID =
    import_ClientSays[4]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_5_ID;
  ClientSay_6_ID =
    import_ClientSays[5]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_6_ID;
  ClientSay_7_ID =
    import_ClientSays[6]?.data?.metaobjectCreate?.metaobject?.id ||
    ClientSay_7_ID;

  if (
    !ClientSay_1_ID ||
    !ClientSay_2_ID ||
    !ClientSay_3_ID ||
    !ClientSay_4_ID ||
    !ClientSay_5_ID ||
    !ClientSay_6_ID ||
    !ClientSay_7_ID
  ) {
    return [
      ...RESULT,
      {errors: 'Error when create Client Say metaobject entries.'},
    ];
  }

  // 6. Import Section Clients Say -------------------------------------
  let SectionClientsSay_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_clients_say',
    'section-clients-say-1',
  );
  const import_SectionClientsSay = await Promise.all([
    !SectionClientsSay_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_clients_say',
            fields: [
              {key: 'title', value: 'Section Clients Say 1'},
              {key: 'heading', value: 'Good news from far away 🥇'},
              {
                key: 'sub_heading',
                value: "Let's see what people think of Ciseco",
              },
              {
                key: 'clients_say',
                value: `["${ClientSay_1_ID}","${ClientSay_2_ID}","${ClientSay_3_ID}","${ClientSay_4_ID}","${ClientSay_5_ID}","${ClientSay_6_ID}","${ClientSay_7_ID}"]`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionClientsSay];

  SectionClientsSay_ID =
    import_SectionClientsSay[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionClientsSay_ID;
  if (!SectionClientsSay_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Clients Say metaobject entries.'},
    ];
  }

  // 7. Import Section Latest Blog -------------------------------------
  let SectionLatestBlog_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_latest_blog',
    'section-latest-blog-1',
  );
  const import_SectionLatestBlogs = await Promise.all([
    !SectionLatestBlog_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_latest_blog',
            fields: [
              {key: 'title', value: 'Section Latest Blog 1'},
              {key: 'heading_bold', value: 'The latest news.'},
              {key: 'heading_light', value: 'From the Ciseco blog'},
              {key: 'background_color', value: '#F7F7F9'},
              {key: 'button_view_all', value: Link_DiscoverMore_ID},
              {key: 'number_of_items', value: '4'},
              {key: 'blog_slug', value: 'news'},
            ],
          },
        })
      : null,
  ]);

  RESULT = [...RESULT, ...import_SectionLatestBlogs];

  SectionLatestBlog_ID =
    import_SectionLatestBlogs[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionLatestBlog_ID;
  if (!SectionLatestBlog_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Latest Blog metaobject entries.'},
    ];
  }

  // 8. Import Section Grid Products and Filter -------------------------------------
  let SectionGridProductsAndFilter_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_grid_products_and_filter',
    'section-grid-products-and-filter-1',
  );
  const import_SectionGridProductsAndFilters = await Promise.all([
    !SectionGridProductsAndFilter_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_grid_products_and_filter',
            fields: [
              {key: 'title', value: 'Section Grid Products and Filter 1'},
              {key: 'heading', value: "What's trending now"},
              {
                key: 'sub_heading',
                value: 'Discover the most trending products in Ciseco.',
              },
              {key: 'hide_filter', value: 'false'},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionGridProductsAndFilters];

  SectionGridProductsAndFilter_ID =
    import_SectionGridProductsAndFilters[0]?.data?.metaobjectCreate?.metaobject
      ?.id || SectionGridProductsAndFilter_ID;
  if (!SectionGridProductsAndFilter_ID) {
    return [
      ...RESULT,
      {
        errors:
          'Error when create Section Grid Products and Filter metaobject entries.',
      },
    ];
  }

  // 9. Import Collection Group -------------------------------------
  let CollectionGroup_Kids_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'kids',
  );
  let CollectionGroup_Man_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'man',
  );
  let CollectionGroup_Women_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'women',
  );
  let CollectionGroup_Jewelry_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'jewelry',
  );
  let CollectionGroup_Beauty_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'beauty',
  );
  let CollectionGroup_Sports_ID = getEntryIDByTypeAndHandle(
    'ciseco--collection_group',
    'sports',
  );

  const import_CollectionGroups = await Promise.all([
    // 9.1 Collection Group Kids
    !CollectionGroup_Kids_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Kids'},
              {key: 'name', value: 'Kids'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48003 18.15C3.51003 17.59 2.91003 16.55 2.91003 15.42V8.58003C2.91003 7.46003 3.51003 6.41999 4.48003 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12 11.0001C13.2869 11.0001 14.33 9.95687 14.33 8.67004C14.33 7.38322 13.2869 6.34009 12 6.34009C10.7132 6.34009 9.67004 7.38322 9.67004 8.67004C9.67004 9.95687 10.7132 11.0001 12 11.0001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M16 16.6601C16 14.8601 14.21 13.4001 12 13.4001C9.79 13.4001 8 14.8601 8 16.6601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>`,
              },
            ],
          },
        })
      : null,

    // 9.2 Collection Group Man
    !CollectionGroup_Man_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Man'},
              {key: 'name', value: 'Man'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.25 21.5C14.5302 21.5 18 18.0302 18 13.75C18 9.46979 14.5302 6 10.25 6C5.96979 6 2.5 9.46979 2.5 13.75C2.5 18.0302 5.96979 21.5 10.25 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               <path d="M21.5 2.5L16 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               <path d="M15 2.5H21.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>`,
              },
            ],
          },
        })
      : null,

    // 9.3 Collection Group Women
    !CollectionGroup_Women_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Women'},
              {key: 'name', value: 'Women'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 16V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15 19H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>`,
              },
            ],
          },
        })
      : null,

    // 9.4 Collection Group Beauty
    !CollectionGroup_Beauty_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Beauty'},
              {key: 'name', value: 'Beauty'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M16.7 18.98H7.30002C6.88002 18.98 6.41002 18.65 6.27002 18.25L2.13002 6.66999C1.54002 5.00999 2.23002 4.49999 3.65002 5.51999L7.55002 8.30999C8.20002 8.75999 8.94002 8.52999 9.22002 7.79999L10.98 3.10999C11.54 1.60999 12.47 1.60999 13.03 3.10999L14.79 7.79999C15.07 8.52999 15.81 8.75999 16.45 8.30999L20.11 5.69999C21.67 4.57999 22.42 5.14999 21.78 6.95999L17.74 18.27C17.59 18.65 17.12 18.98 16.7 18.98Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               <path d="M6.5 22H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               <path d="M9.5 14H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>`,
              },
            ],
          },
        })
      : null,

    // 9.5 Collection Group Jewelry
    !CollectionGroup_Jewelry_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Jewelry'},
              {key: 'name', value: 'Jewelry'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7998 3.40005L7.19982 7.70005C7.09982 7.90005 6.99982 8.20005 6.89982 8.40005L5.19982 17C5.09982 17.6 5.39982 18.3 5.89982 18.6L11.1998 21.6C11.5998 21.8 12.2998 21.8 12.6998 21.6L17.9998 18.6C18.4998 18.3 18.7998 17.6 18.6998 17L16.9998 8.40005C16.9998 8.20005 16.7998 7.90005 16.6998 7.70005L13.0998 3.40005C12.4998 2.60005 11.4998 2.60005 10.7998 3.40005Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M16.8002 8.5L12.5002 20.7C12.3002 21.1 11.7002 21.1 11.6002 20.7L7.2002 8.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>`,
              },
            ],
          },
        })
      : null,

    // 9.6 Collection Group Sports
    !CollectionGroup_Sports_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--collection_group',
            fields: [
              {key: 'title', value: 'Sports'},
              {key: 'name', value: 'Sports'},
              {
                key: 'icon_svg',
                value: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1801 18C19.5801 18 20.1801 16.65 20.1801 15V9C20.1801 7.35 19.5801 6 17.1801 6C14.7801 6 14.1801 7.35 14.1801 9V15C14.1801 16.65 14.7801 18 17.1801 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M6.81995 18C4.41995 18 3.81995 16.65 3.81995 15V9C3.81995 7.35 4.41995 6 6.81995 6C9.21995 6 9.81995 7.35 9.81995 9V15C9.81995 16.65 9.21995 18 6.81995 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9.81995 12H14.1799" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M22.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M1.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_CollectionGroups];

  CollectionGroup_Kids_ID =
    import_CollectionGroups[0]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Kids_ID;
  CollectionGroup_Man_ID =
    import_CollectionGroups[1]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Man_ID;
  CollectionGroup_Women_ID =
    import_CollectionGroups[2]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Women_ID;
  CollectionGroup_Jewelry_ID =
    import_CollectionGroups[3]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Jewelry_ID;
  CollectionGroup_Beauty_ID =
    import_CollectionGroups[4]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Beauty_ID;
  CollectionGroup_Sports_ID =
    import_CollectionGroups[5]?.data?.metaobjectCreate?.metaobject?.id ||
    CollectionGroup_Sports_ID;

  if (
    !CollectionGroup_Kids_ID ||
    !CollectionGroup_Man_ID ||
    !CollectionGroup_Women_ID ||
    !CollectionGroup_Jewelry_ID ||
    !CollectionGroup_Beauty_ID ||
    !CollectionGroup_Sports_ID
  ) {
    return [
      ...RESULT,
      {errors: 'Error when create Collection Group metaobject entries.'},
    ];
  }

  // 10. Import Section | TabsCollectionsByGroup -------------------------------------
  let SectionTabsCollectionsByGroup_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_tabs_collections_by_group',
    'section-tabs-collections-by-group-1',
  );
  const import_SectionTabsCollectionsByGroups = await Promise.all([
    !SectionTabsCollectionsByGroup_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_tabs_collections_by_group',
            fields: [
              {key: 'title', value: 'Section Tabs Collections By Group 1'},
              {key: 'heading', value: 'Start exploring.'},
              {key: 'number_collections_to_show', value: '6'},
              {key: 'card_style', value: '4'},
              {key: 'background_color', value: '#F7F7F9'},
              {
                key: 'collection_groups',
                value: `["${CollectionGroup_Kids_ID}","${CollectionGroup_Man_ID}","${CollectionGroup_Women_ID}","${CollectionGroup_Beauty_ID}","${CollectionGroup_Jewelry_ID}","${CollectionGroup_Sports_ID}"]`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionTabsCollectionsByGroups];

  SectionTabsCollectionsByGroup_ID =
    import_SectionTabsCollectionsByGroups[0]?.data?.metaobjectCreate?.metaobject
      ?.id || SectionTabsCollectionsByGroup_ID;
  if (!SectionTabsCollectionsByGroup_ID) {
    return [
      ...RESULT,
      {
        errors:
          'Error when create Section Tabs Collections By Group metaobject entries.',
      },
    ];
  }

  // 11. Import Section | ImageWithText -------------------------------------
  let SectionImageWithText_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_image_with_text',
    'section-image-with-text-1',
  );
  let SectionImageWithText_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_image_with_text',
    'section-image-with-text-2',
  );
  let SectionImageWithText_3_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_image_with_text',
    'section-image-with-text-3',
  );

  const import_SectionImageWithTexts = await Promise.all([
    !SectionImageWithText_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_image_with_text',
            fields: [
              {key: 'title', value: 'Section Image With Text 1'},
              {key: 'heading', value: 'Earn <i>free</i> money with Ciseco'},
              {
                key: 'content',
                value:
                  'With Ciseco you will get a freeship & savings combo, etc.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_img_with_text_1'),
              },
              {key: 'hide_logo', value: 'false'},
              {key: 'show_subscribers_input', value: 'false'},
              {key: 'style', value: '1'},
              {key: 'button_1', value: Link_DiscoverMore_ID},
              {key: 'button_2', value: Link_SavingsCombo_ID},
            ],
          },
        })
      : null,

    !SectionImageWithText_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_image_with_text',
            fields: [
              {key: 'title', value: 'Section Image With Text 2'},
              {key: 'heading', value: 'Special offer in <i>kids</i> products'},
              {
                key: 'content',
                value:
                  'Fashion is a form of self-expression and autonomy at a particular period and place.',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_img_with_text_2'),
              },
              {key: 'hide_logo', value: 'false'},
              {key: 'show_subscribers_input', value: 'false'},
              {key: 'style', value: '2'},
              {key: 'button_1', value: Link_DiscoverMore_ID},
            ],
          },
        })
      : null,

    !SectionImageWithText_3_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_image_with_text',
            fields: [
              {key: 'title', value: 'Section Image With Text 3'},
              {
                key: 'heading',
                value: "Don't miss out on special <i>offers</i>",
              },
              {
                key: 'content',
                value:
                  'Register to receive news about the latest, savings combos, discount codes, and more, directly to your inbox!',
              },
              {
                key: 'image',
                value: getImageIDByFilename('ciseco_img_with_text_3'),
              },
              {key: 'hide_logo', value: 'true'},
              {key: 'show_subscribers_input', value: 'true'},
              {key: 'style', value: '3'},
              {
                key: 'features',
                value: `["Savings combos","Discount codes","Premium magazines"]`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionImageWithTexts];

  SectionImageWithText_1_ID =
    import_SectionImageWithTexts[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionImageWithText_1_ID;
  SectionImageWithText_2_ID =
    import_SectionImageWithTexts[1]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionImageWithText_2_ID;
  SectionImageWithText_3_ID =
    import_SectionImageWithTexts[2]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionImageWithText_3_ID;

  if (
    !SectionImageWithText_1_ID ||
    !SectionImageWithText_2_ID ||
    !SectionImageWithText_3_ID
  ) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Image With Text metaobject entries.'},
    ];
  }

  // 12. Import Section | Steps -------------------------------------
  let SectionSteps_home_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_steps',
    'section-steps-home-1',
  );
  let SectionSteps_home_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_steps',
    'section-steps-home-2',
  );
  const import_SectionSteps = await Promise.all([
    !SectionSteps_home_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_steps',
            fields: [
              {key: 'title', value: 'Section Steps Home 1'},
              {key: 'style', value: '1'},
              {
                key: 'labels',
                value: `["Step 1","Step 2","Step 3","Step 4"]`,
              },
              {
                key: 'headings',
                value: `["Filter & Discover","Add to Bag","Fast shipping","Enjoy the product"]`,
              },
              {
                key: 'contents',
                value: `["Smart filtering and suggestions make it easy to find.","Easily select the correct items and add them to the cart.","The carrier will confirm and ship quickly to you.","Have fun and enjoy your 5-star quality products."]`,
              },
              {
                key: 'icons',
                value: `["${getImageIDByFilename('ciseco_HIW1img')}","${getImageIDByFilename('ciseco_HIW2img')}","${getImageIDByFilename('ciseco_HIW3img')}","${getImageIDByFilename('ciseco_HIW4img')}"]`,
              },
            ],
          },
        })
      : null,

    !SectionSteps_home_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_steps',
            fields: [
              {key: 'title', value: 'Section Steps Home 2'},
              {key: 'style', value: '2'},
              {
                key: 'labels',
                value: `["Step 1","Step 2","Step 3","Step 4"]`,
              },
              {
                key: 'headings',
                value: `["Filter & Discover","Add to Bag","Fast shipping","Enjoy the product"]`,
              },
              {
                key: 'contents',
                value: `["Smart filtering and suggestions make it easy to find.","Easily select the correct items and add them to the cart.","The carrier will confirm and ship quickly to you.","Have fun and enjoy your 5-star quality products."]`,
              },
              {
                key: 'icons',
                value: `["${getImageIDByFilename('ciseco_HIW1img')}","${getImageIDByFilename('ciseco_HIW2img')}","${getImageIDByFilename('ciseco_HIW3img')}","${getImageIDByFilename('ciseco_HIW4img')}"]`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionSteps];

  SectionSteps_home_1_ID =
    import_SectionSteps[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionSteps_home_1_ID;
  SectionSteps_home_2_ID =
    import_SectionSteps[1]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionSteps_home_2_ID;

  if (!SectionSteps_home_1_ID || !SectionSteps_home_2_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Steps metaobject entries.'},
    ];
  }

  // 13. Import Section | ProductsSlider -------------------------------------
  let SectionProductsSlider_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_products_slider',
    'section-products-slider-1',
  );
  let SectionProductsSlider_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_products_slider',
    'section-products-slider-2',
  );

  const import_SectionProductsSliders = await Promise.all([
    !SectionProductsSlider_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_products_slider',
            fields: [
              {key: 'title', value: 'Section Products Slider 1'},
              {key: 'heading_bold', value: 'New Arrivals.'},
              {key: 'heading_light', value: 'REY backpacks & bagsss'},
              {key: 'style', value: '1'},
            ],
          },
        })
      : null,

    !SectionProductsSlider_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_products_slider',
            fields: [
              {key: 'title', value: 'Section Products Slider 2'},
              {key: 'heading_bold', value: 'Chosen by our experts'},
              {key: 'style', value: '2'},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionProductsSliders];

  SectionProductsSlider_1_ID =
    import_SectionProductsSliders[0]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionProductsSlider_1_ID;
  SectionProductsSlider_2_ID =
    import_SectionProductsSliders[1]?.data?.metaobjectCreate?.metaobject?.id ||
    SectionProductsSlider_2_ID;

  if (!SectionProductsSlider_1_ID || !SectionProductsSlider_2_ID) {
    return [
      ...RESULT,
      {errors: 'Error when create Section Products Slider metaobject entries.'},
    ];
  }

  // 14. Import Section | CollectionsSlider -------------------------------------
  let SectionCollectionsSlider_1_ID = getEntryIDByTypeAndHandle(
    'ciseco--section_collections_slider',
    'section-collections-slider-1',
  );

  const import_SectionCollectionsSliders = await Promise.all([
    !SectionCollectionsSlider_1_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--section_collections_slider',
            fields: [
              {key: 'title', value: 'Section Collections Slider 1'},
              {key: 'heading_bold', value: 'Discover more.'},
              {key: 'heading_light', value: 'Good things are waiting for you'},
              {key: 'button_text', value: 'See collection'},
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_SectionCollectionsSliders];

  SectionCollectionsSlider_1_ID =
    import_SectionCollectionsSliders[0]?.data?.metaobjectCreate?.metaobject
      ?.id || SectionCollectionsSlider_1_ID;

  if (!SectionCollectionsSlider_1_ID) {
    return [
      ...RESULT,
      {
        errors:
          'Error when create Section Collections Slider metaobject entries.',
      },
    ];
  }

  // 15. Import Route -------------------------------------
  let Route_Home_ID = getEntryIDByTypeAndHandle('ciseco--route', 'route-home');
  let Route_Home_2_ID = getEntryIDByTypeAndHandle(
    'ciseco--route',
    'route-home-2',
  );
  let Route_Collection_ID = getEntryIDByTypeAndHandle(
    'ciseco--route',
    'route-collection',
  );
  let Route_Product_ID = getEntryIDByTypeAndHandle(
    'ciseco--route',
    'route-product',
  );
  let Route_Search_ID = getEntryIDByTypeAndHandle(
    'ciseco--route',
    'route-seach',
  );
  let Route_News_ID = getEntryIDByTypeAndHandle('ciseco--route', 'route-news');

  const import_Routes = await Promise.all([
    !Route_Home_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route Home'},
              {key: 'firt_line_on_top', value: 'false'},
              {key: 'separation_line_between_sections', value: 'false'},
              {
                key: 'sections',
                value: `["${SectionHeroSlider_ID}","${SectionCollectionsSlider_1_ID}","${SectionProductsSlider_1_ID}","${SectionSteps_home_1_ID}","${SectionImageWithText_1_ID}","${SectionTabsCollectionsByGroup_ID}","${SectionProductsSlider_2_ID}","${SectionImageWithText_2_ID}","${SectionGridProductsAndFilter_ID}","${SectionLatestBlog_ID}","${SectionClientsSay_ID}"]`,
              },
            ],
          },
        })
      : null,

    !Route_Home_2_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route Home 2'},
              {key: 'firt_line_on_top', value: 'false'},
              {key: 'separation_line_between_sections', value: 'false'},
              {
                key: 'sections',
                value: `["${SectionHero_ID}","${SectionSteps_home_2_ID}","${SectionProductsSlider_1_ID}","${SectionTabsCollectionsByGroup_ID}","${SectionProductsSlider_2_ID}","${SectionImageWithText_3_ID}","${SectionGridProductsAndFilter_ID}","${SectionImageWithText_1_ID}"]`,
              },
            ],
          },
        })
      : null,

    !Route_Collection_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route Collection'},
              {key: 'firt_line_on_top', value: 'true'},
              {key: 'separation_line_between_sections', value: 'true'},
              {
                key: 'sections',
                value: `["${SectionImageWithText_1_ID}","${SectionProductsSlider_2_ID}"]`,
              },
            ],
          },
        })
      : null,

    !Route_Product_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route Product'},
              {key: 'firt_line_on_top', value: 'true'},
              {key: 'separation_line_between_sections', value: 'false'},
              {
                key: 'sections',
                value: `["${SectionImageWithText_2_ID}"]`,
              },
            ],
          },
        })
      : null,

    !Route_Search_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route Search'},
              {key: 'firt_line_on_top', value: 'true'},
              {key: 'separation_line_between_sections', value: 'false'},
              {
                key: 'sections',
                value: `["${SectionImageWithText_1_ID}"]`,
              },
            ],
          },
        })
      : null,

    !Route_News_ID
      ? fetchImportMetaobjectEntriesItem({
          shopify_Access_Token,
          storeDomain,
          metaobject: {
            type: 'ciseco--route',
            fields: [
              {key: 'title', value: 'Route News'},
              {key: 'firt_line_on_top', value: 'true'},
              {key: 'separation_line_between_sections', value: 'true'},
              {
                key: 'sections',
                value: `["${SectionImageWithText_1_ID}"]`,
              },
            ],
          },
        })
      : null,
  ]);
  RESULT = [...RESULT, ...import_Routes];

  Route_Home_ID =
    import_Routes[0]?.data?.metaobjectCreate?.metaobject?.id || Route_Home_ID;
  Route_Home_2_ID =
    import_Routes[1]?.data?.metaobjectCreate?.metaobject?.id || Route_Home_2_ID;
  Route_Collection_ID =
    import_Routes[2]?.data?.metaobjectCreate?.metaobject?.id ||
    Route_Collection_ID;
  Route_Product_ID =
    import_Routes[3]?.data?.metaobjectCreate?.metaobject?.id ||
    Route_Product_ID;
  Route_Search_ID =
    import_Routes[4]?.data?.metaobjectCreate?.metaobject?.id || Route_Search_ID;
  Route_News_ID =
    import_Routes[5]?.data?.metaobjectCreate?.metaobject?.id || Route_News_ID;

  if (
    !Route_Home_ID ||
    !Route_Home_2_ID ||
    !Route_Collection_ID ||
    !Route_Product_ID ||
    !Route_Search_ID ||
    !Route_News_ID
  ) {
    return [...RESULT, {errors: 'Error when create Route metaobject entries.'}];
  }

  //
  //
  // END
  RESULT = [...RESULT, ...import_Links_and_Socials];
  return RESULT;
};

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const {_action, shopify_Access_Token, ...otherFields} =
    Object.fromEntries(formData);
  let result = {
    message: 'Hello, World!',
    general_check_up: null,
    fetch1_create_metafield_definitions: null,
    fetch2_create_metafield_definitions: null,
    import_entries: null,
  };

  //
  if (_action === 'general_check_up') {
    const general_check_up = await fetch(
      `https://${context.env.PUBLIC_STORE_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': shopify_Access_Token.toString(),
        },
        body: JSON.stringify({
          query: `query {
            metaobjectDefinitions(first: 250) {
                nodes {
                  id
                  type
                  name
                  metaobjectsCount
                  access {
                    admin
                    storefront
                  }
                }
            }
            productMetafieldDefinitions: metafieldDefinitions(
              ownerType: PRODUCT
              first: 250
            ) {
                nodes {
                  id
                  key
                  name
                  namespace
                  ownerType
                  access {
                    admin
                    storefront
                  }
                }
              }
            collectionMetafieldDefinitions: metafieldDefinitions(
              ownerType: COLLECTION
              first: 250
            ) {
                nodes {
                  id
                  key
                  name
                  namespace
                  ownerType
                  access {
                    admin
                    storefront
                  }
                }
              }
          }
          `,
        }),
      },
    ).then((res) => res.json());
    return json({
      ...result,
      general_check_up,
    });
  }

  // Create metaobject/metafield definitions
  if (_action === 'create_metaobject_metafield_definitions') {
    return json({
      ...result,
      fetch1_create_metafield_definitions:
        await mutationMetaObjectDefinitionsFetchs({
          shopify_Access_Token: shopify_Access_Token.toString(),
          storeDomain: context.env.PUBLIC_STORE_DOMAIN,
          otherFields,
        }),
      fetch2_create_metafield_definitions:
        await mutaionMetafieldDefinitionsFetchs({
          shopify_Access_Token: shopify_Access_Token.toString(),
          storeDomain: context.env.PUBLIC_STORE_DOMAIN,
          otherFields,
        }),
    });
  }

  // import_demo_metaobjects_entries
  if (_action === 'import_demo_metaobjects_entries') {
    return json({
      ...result,
      import_entries: await fetchImportMetaobjectEntries({
        shopify_Access_Token: shopify_Access_Token.toString(),
        storeDomain: context.env.PUBLIC_STORE_DOMAIN,
        otherFields,
      }),
    });
  }

  return json({
    ...result,
  });
}

const __ACCESS_TOKEN = '';

export default function Page() {
  const fetcher = useFetcher<typeof action>({
    key: 'cisecoInitCreateMetaobjectDefinitions',
  });
  const [accessToken, setAccessToken] = useState(__ACCESS_TOKEN);
  const isLoading = fetcher.state !== 'idle';

  const renderFormGeneralCheckUp = () => {
    return (
      <fetcher.Form method="post" className="grid gap-5 ">
        <input type="hidden" name="shopify_Access_Token" value={accessToken} />
        <ButtonPrimary
          value="general_check_up"
          type="submit"
          name="_action"
          disabled={isLoading}
          loading={isLoading}
        >
          General check up
        </ButtonPrimary>
      </fetcher.Form>
    );
  };

  return (
    <div className={clsx('', 'py-24')}>
      <div className="container">
        <div className="max-w-sm mx-auto">
          <div>
            <label
              htmlFor="shopify_Access_Token"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Shopify Access Token
            </label>
            <Input
              type="text"
              onChange={(e) => {
                setAccessToken(e.target.value);
              }}
              className="mt-2"
              defaultValue={__ACCESS_TOKEN || undefined}
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxxx"
            />
            <span className="text-xs text-neutral-700">
              You can get the access token from your Shopify admin.
            </span>
          </div>

          <div className="mt-10 grid gap-8">{renderFormGeneralCheckUp()}</div>
        </div>

        <BoxMessage accessToken={accessToken} />
      </div>
    </div>
  );
}

function BoxMessage({accessToken}: {accessToken: string}) {
  const fetcher = useFetcher<typeof action>({
    key: 'cisecoInitCreateMetaobjectDefinitions',
  });
  const isLoading = fetcher.state !== 'idle';
  const {env} = useLoaderData<typeof loader>();

  console.log('------fetcher.data', fetcher.data);

  if (!fetcher.data) {
    return null;
  }

  const findMetaobjectDefinitionFromGeneralCheck = (
    type: CisecoMetaobjectDefinitionsT,
  ) => {
    return (
      fetcher?.data?.general_check_up as any
    )?.data?.metaobjectDefinitions?.nodes?.find(
      (item: any) => item.type === type,
    );
  };

  const general_check_up = fetcher?.data?.general_check_up as Record<
    string,
    any
  > | null;
  const import_entries = fetcher?.data?.import_entries as any[] | null;
  const fetch1_create_metafield_definitions = fetcher?.data
    ?.fetch1_create_metafield_definitions as any[] | null;
  const fetch2_create_metafield_definitions = fetcher?.data
    ?.fetch2_create_metafield_definitions as any[] | null;
  //
  const checkUpData = general_check_up?.data as Record<string, any> | null;
  const error =
    general_check_up?.errors ||
    import_entries?.some((item) => item?.errors) ||
    fetch1_create_metafield_definitions?.some((item) => item?.errors) ||
    fetch2_create_metafield_definitions?.some((item) => item?.errors)
      ? 'An error has occurred, please click below to view full information'
      : null;
  const metaobjectDefinitions: any[] =
    checkUpData?.metaobjectDefinitions?.nodes || [];
  const productMetafieldDefinitions: any[] =
    checkUpData?.productMetafieldDefinitions?.nodes || [];
  const collectionMetafieldDefinitions: any[] =
    checkUpData?.collectionMetafieldDefinitions?.nodes || [];

  const product_mtf_outstanding_features = productMetafieldDefinitions.find(
    (item) =>
      item.namespace === 'ciseco--product' &&
      item.key === 'outstanding_features',
  );
  const collection_mtf_horizontal_image = collectionMetafieldDefinitions.find(
    (item) =>
      item.namespace === 'ciseco--collection' &&
      item.key === 'horizontal_image',
  );
  const ciseco_metaobjectDefinitions: {
    name: string;
    item: Record<string, any> | null;
    type: CisecoMetaobjectDefinitionsT;
  }[] = [
    {
      name: 'Link',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--link'),
      type: 'ciseco--link',
    },
    {
      name: 'Social',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--social'),
      type: 'ciseco--social',
    },
    {
      name: 'Hero item',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--hero_item'),
      type: 'ciseco--hero_item',
    },
    {
      name: 'Section | Hero',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--section_hero'),
      type: 'ciseco--section_hero',
    },
    {
      name: 'Section | HeroSlider',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_hero_slider',
      ),
      type: 'ciseco--section_hero_slider',
    },
    {
      name: 'Client Say',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--client_say'),
      type: 'ciseco--client_say',
    },
    {
      name: 'Section | ClientsSay',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_clients_say',
      ),
      type: 'ciseco--section_clients_say',
    },
    {
      name: 'Section | ImageWithText',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_image_with_text',
      ),
      type: 'ciseco--section_image_with_text',
    },
    {
      name: 'Section | Steps',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--section_steps'),
      type: 'ciseco--section_steps',
    },
    {
      name: 'Section | ProductsSlider',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_products_slider',
      ),
      type: 'ciseco--section_products_slider',
    },
    {
      name: 'Section | CollectionsSlider',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_collections_slider',
      ),
      type: 'ciseco--section_collections_slider',
    },
    {
      name: 'Collection Group',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--collection_group',
      ),
      type: 'ciseco--collection_group',
    },
    {
      name: 'Section | TabsCollectionsByGroup',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_tabs_collections_by_group',
      ),
      type: 'ciseco--section_tabs_collections_by_group',
    },
    {
      name: 'Section | GridProductsAndFilter',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_grid_products_and_filter',
      ),
      type: 'ciseco--section_grid_products_and_filter',
    },
    {
      name: 'Section | LatestBlog',
      item: findMetaobjectDefinitionFromGeneralCheck(
        'ciseco--section_latest_blog',
      ),
      type: 'ciseco--section_latest_blog',
    },
    {
      name: 'Route',
      item: findMetaobjectDefinitionFromGeneralCheck('ciseco--route'),
      type: 'ciseco--route',
    },
  ];

  const allDefinitionsOkDone =
    ciseco_metaobjectDefinitions.every((item) => !!item.item) &&
    product_mtf_outstanding_features &&
    collection_mtf_horizontal_image;
  //

  const renderForms = () => {
    return (
      <div className="grid gap-2">
        {/*  */}
        {!allDefinitionsOkDone && (
          <fetcher.Form method="post" className="grid gap-5">
            <ButtonPrimary
              value="create_metaobject_metafield_definitions"
              type="submit"
              name="_action"
              loading={isLoading}
            >
              Create metaobject/metafield definitions
            </ButtonPrimary>
            {!product_mtf_outstanding_features && (
              <input
                type="hidden"
                name="product_mtf_outstanding_features"
                value="product_mtf_outstanding_features"
              />
            )}

            {!collection_mtf_horizontal_image && (
              <input
                type="hidden"
                name="collection_mtf_horizontal_image"
                value="collection_mtf_horizontal_image"
              />
            )}

            {ciseco_metaobjectDefinitions.map((item) =>
              !item.item ? (
                <input
                  type="hidden"
                  name={'metaobject_need_create__' + item.type}
                  value={item.type || ''}
                  key={item.name}
                />
              ) : (
                <input
                  type="hidden"
                  name={'metaobject_done_created__' + item.type}
                  value={item.item?.id || ''}
                  key={item.name}
                />
              ),
            )}

            <input
              type="hidden"
              name="shopify_Access_Token"
              value={accessToken}
            />
          </fetcher.Form>
        )}

        {/*  */}
        {allDefinitionsOkDone && (
          <fetcher.Form method="post" className="grid gap-5">
            <input
              type="hidden"
              name="shopify_Access_Token"
              value={accessToken}
            />
            <ButtonSecondary
              value="import_demo_metaobjects_entries"
              type="submit"
              name="_action"
              loading={isLoading}
            >
              Import demo metaobjects entries
            </ButtonSecondary>
          </fetcher.Form>
        )}
      </div>
    );
  };

  const renderItemStatus = (item: any, text: string) => {
    let setUpLink = '';
    // gid://shopify/MetaobjectDefinition/1132232959
    const id = item?.id?.match(/(\d+)/g)[0];
    if (!id) {
      setUpLink = '';
    } else {
      if (item?.ownerType === 'COLLECTION') {
        setUpLink = `https://${env.PUBLIC_STORE_DOMAIN}/admin/settings/custom_data/collection/metafields/${id}`;
      } else if (item?.ownerType === 'PRODUCT') {
        setUpLink = `https://${env.PUBLIC_STORE_DOMAIN}/admin/settings/custom_data/product/metafields/${id}`;
      } else {
        setUpLink = `https://${env.PUBLIC_STORE_DOMAIN}/admin/settings/custom_data/metaobjects/${item?.type}`;
      }
    }

    return (
      <div className="flex items-center gap-2">
        {item ? (
          <CheckIcon className="w-4 h-4 text-green-700" />
        ) : (
          <ExclamationCircleIcon className="w-4 h-4 text-red-700" />
        )}
        {text}{' '}
        {typeof item?.metaobjectsCount === 'number'
          ? `(entries: ${item?.metaobjectsCount})`
          : null}
        <div hidden={!id}>
          <span> (Storefront: </span>
          {item?.access?.storefront && item?.access?.storefront !== 'NONE' ? (
            item?.access?.storefront
          ) : (
            <>
              <span className="text-red-500">N/A</span>
              {` `}-{` `}
              <a
                href={setUpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Set up
              </a>
            </>
          )}
          <span>)</span>
        </div>
      </div>
    );
  };

  const renderStatusAll = () => {
    if (!general_check_up || !checkUpData) {
      return null;
    }
    return (
      <>
        <div className="my-5 grid gap-2.5">
          {renderItemStatus(
            product_mtf_outstanding_features,
            'Product metafield - Outstanding Features',
          )}
          {renderItemStatus(
            collection_mtf_horizontal_image,
            'Collection metafield - Horizontal Image',
          )}
          {ciseco_metaobjectDefinitions.map((item) => (
            <div key={item.name}>
              {renderItemStatus(
                item.item,
                `Metaobject definition - ${item.name}`,
              )}
            </div>
          ))}
        </div>
        <hr className="my-2.5" />
        <div>
          Please go to {` `}
          <a
            href={`https://${env.PUBLIC_STORE_DOMAIN}/admin/settings/custom_data`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline"
          >
            metaobject/metafield definitions
          </a>{' '}
          and full definition or {` `}
          <br />
          <br />
          {renderForms()}
        </div>
      </>
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      {isLoading ? (
        <div className="block my-5 text-xs text-center">
          Loading... Please <strong>do not</strong> leave, close or reload this
          page until the process is complete!
        </div>
      ) : null}

      <hr className="my-10" />
      <div
        className={clsx(
          'p-5 border rounded-2xl text-xs text-neutral-700 overflow-auto hiddenScrollbar',
        )}
      >
        {/* MESSAGE */}
        {isLoading ? (
          <div className="block mb-2.5 font-semibold">Loading...</div>
        ) : (
          <div className="block mb-2.5">
            <span className="font-semibold">Message:</span>
            {error ? (
              <span className="ml-2 text-red-600">Error! {error}</span>
            ) : (
              <span className="ml-2 text-green-700">
                Success! Progress has been completed! 🎉
              </span>
            )}
          </div>
        )}

        {/* RENDER STATUS */}
        {renderStatusAll()}

        <hr className="my-4" />
        <details className="text-xs">
          <summary>
            <span className="text-xs text-neutral-700">Show fetcher.data</span>
          </summary>
          <hr className="my-2" />
          <div className="max-h-screen overflow-auto hiddenScrollbar">
            <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
          </div>
        </details>
      </div>
    </div>
  );
}
