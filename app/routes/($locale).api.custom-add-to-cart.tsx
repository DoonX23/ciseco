// routes/api.create-variant.ts

import {json} from '@shopify/remix-oxygen';
import type {ActionFunction} from '@shopify/remix-oxygen';
import {calculatePriceAndWeight, type CalculationProps} from '~/utils/calculations';

interface ShopifyResponse {
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
  data?: any;
}

const CREATE_VARIANT_MUTATION = `#graphql
  mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkCreate(productId: $productId, variants: $variants) {
      userErrors {
        field
        message
      }
      productVariants {
        id
        title
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const action: ActionFunction = async ({request, context}) => {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId');
    const quantity = formData.get('quantity');
    const uniqueVariantName = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const calculationProps: CalculationProps = {
      formType: formData.get('formType') as string,
      thickness: formData.get('thickness') as string,
      diameter: formData.get('diameter') as string,
      density: parseFloat(formData.get('density') as string),
      // 根据formType使用不同的长度单位
      ...(formData.get('formType') === 'Film' 
        ? { lengthM: parseFloat(formData.get('lengthM') as string) }
        : { lengthMm: parseFloat(formData.get('lengthMm') as string) }
      ),
      widthMm: parseFloat(formData.get('widthMm') as string),
      precision: formData.get('precision') as string,
      quantity: parseInt(formData.get('quantity') as string),
      unitPrice: parseFloat(formData.get('unitPrice') as string)
    };

    const {price, weight} = calculatePriceAndWeight(calculationProps);

    const variables = {
      "productId": productId,
      "variants": [
        {
          "price": price,
          "optionValues": [{"optionName": "Title", "name": uniqueVariantName}],
          "inventoryQuantities": {"availableQuantity": 1000, "locationId": "gid://shopify/Location/79990817057"},
          "inventoryItem": {
            "measurement": {
              "weight": {
                "value": weight,
                "unit": "KILOGRAMS"
              }
            }
          }
        }
      ]
    };
    
    const adminApiResponse = await fetch(
      `https://${context.env.PUBLIC_STORE_DOMAIN}/admin/api/2024-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': context.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: CREATE_VARIANT_MUTATION,
          variables: variables
        }),
      }
    );

    if (!adminApiResponse.ok) {
      throw new Error(`Admin API request failed: ${adminApiResponse.status}`);
    }

    const result = await adminApiResponse.json() as ShopifyResponse;

    if (result.errors || result.data?.productVariantsBulkCreate?.userErrors?.length > 0) {
      throw new Error('Failed to create variant');
    }

    const newVariantId = result.data.productVariantsBulkCreate.productVariants[0].id;

    try {
      const lineAttributes = [];

      // 根据formType添加thickness或diameter
      if (calculationProps.formType === 'Sheet' || calculationProps.formType === 'Film') {
        lineAttributes.push({
          key: 'Thickness',
          value: `${calculationProps.thickness}`
        });
      } else if (calculationProps.formType === 'Rod') {
        lineAttributes.push({
          key: 'Diameter',
          value: `${calculationProps.diameter}`
        });
      }

      // 根据formType添加长度显示
      if (calculationProps.formType === 'Film') {
        const lengthM = formData.get('lengthM');
        const lengthYard = formData.get('lengthYard');
        lineAttributes.push({
          key: 'Length',
          value: `${lengthM}m (${lengthYard}yard)`
        });
      } else {
        const lengthMm = formData.get('lengthMm');
        const lengthInch = formData.get('lengthInch');
        lineAttributes.push({
          key: 'Length',
          value: `${lengthMm}mm (${lengthInch}")`
        });
      }

      // 添加宽度（同时显示mm和inch）
      if (calculationProps.widthMm) {
        const widthInch = formData.get('widthInch');
        lineAttributes.push({
          key: 'Width',
          value: `${calculationProps.widthMm}mm (${widthInch}")`
        });
      }

      // 添加精度
      if (calculationProps.precision) {
        lineAttributes.push({
          key: 'Precision',
          value: calculationProps.precision
        });
      }

      // 添加说明信息
      const instructions = formData.get('instructions');
      if (instructions) {
        lineAttributes.push({
          key: 'Instructions',
          value: instructions as string
        });
      }

      const lineData = {
        merchandiseId: newVariantId,
        quantity: parseInt(quantity as string) || 1,
        attributes: lineAttributes
      };
      
      const cartResult = await context.cart.addLines([lineData])
        .catch(error => {
          throw error;
        });
        
      const headers = context.cart.setCartId(cartResult.cart.id);

      return json(
        {
          status: 'success',
          variantCreation: result.data,
          cartOperation: cartResult
        },
        {
          headers
        }
      );

    } catch (cartError) {
      throw new Error(`Cart operation failed: ${cartError instanceof Error ? cartError.message : 'Unknown error'}`);
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      return json(
        {
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        {status: 500}
      );
    }

    return json(
      {
        status: 'error',
        error: 'An unknown error occurred',
        timestamp: new Date().toISOString(),
      },
      {status: 500}
    );
  }
};
