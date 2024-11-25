import type {ProductQuery} from 'storefrontapi.generated';
import {useEffect, useState} from 'react';
import {useAside} from '~/components/Aside';
import {Link} from '~/components/Link';
import {SlashIcon} from '@heroicons/react/24/solid';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import BagIcon from '~/components/BagIcon';
import {useFetcher} from '@remix-run/react';
import {UnitConverter} from '~/components/UnitConverter';
import CustomInputNumber from '~/components/CustomInputNumber';
import {PriceCalculator} from '~/components/PriceCalculator';

interface ApiResponse {
  status: 'success' | 'error';
  error?: string;
  variantCreation?: any;
  cartOperation?: any;
  timestamp?: string;
}

export function CustomProductForm({product}: {product: ProductQuery['product']}) {
  if (!product?.id) {
    throw new Response('product', {status: 404});
  }
  
  const fetcher = useFetcher<ApiResponse>();
  const {open} = useAside();
  const collection = product.collections.nodes[0];
  
  const formType = product.form_type?.value || '';
  const machiningPrecision = product.machining_precision?.value || 'Normal (±2mm)';
  
  const [hasError, setHasError] = useState(false);
  const [lengthMm, setLengthMm] = useState(1);
  const [lengthM, setLengthM] = useState(1);
  const [widthMm, setWidthMm] = useState(formType === 'Film' ? 450 : 1);
  const [quantity, setQuantity] = useState(1);
  const [precision, setPrecision] = useState(machiningPrecision);

  useEffect(() => {
    if (fetcher.data?.status === 'success') {
      open('cart');
    } else if (fetcher.data?.error) {
      console.error('添加失败:', fetcher.data.error);
    }
  }, [fetcher.data, open]);

  const handlePrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecision(e.target.value);
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6">
      <div>
        {!!collection && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <Link
                    to={'/'}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <SlashIcon className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300" />
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <Link
                    to={'/collections/' + collection.handle}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {collection.title.replace(/(<([^>]+)>)/gi, '')}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl font-semibold" title={product.title}>
          {product.title}
        </h1>
      </div>
      <PriceCalculator 
              formType={formType}
              thickness={product.thickness?.value || ''}
              diameter={product.diameter?.value || ''}
              density={Number(product.density?.value) || 0}
              lengthMm={lengthMm}
              lengthM={lengthM}
              widthMm={widthMm}
              precision={precision}
              quantity={quantity}
              unitPrice={Number(product.unit_price?.value) || 0}
        />
      <fetcher.Form action="/api/custom-add-to-cart" method="post">
        <input type="hidden" name="productId" value={product.id || ''} />
        <input type="hidden" name="formType" value={formType} />
        <input type="hidden" name="material" value={product.material?.value || ''} />
        <input type="hidden" name="opacity" value={product.opacity?.value || ''} />
        <input type="hidden" name="color" value={product.color?.value || ''} />
        <input type="hidden" name="thickness" value={product.thickness?.value || ''} />
        <input type="hidden" name="diameter" value={product.diameter?.value || ''} />
        <input type="hidden" name="density" value={product.density?.value || ''} />
        <input type="hidden" name="unitPrice" value={product.unit_price?.value || ''} />

        <div className="mt-6 mb-6">
          <div className="space-y-6 max-w-xl">
            {formType === 'Film' ? (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Width</label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {[450, 1370].map((width) => (
                      <div key={width} className="flex items-center">
                        <input
                          type="radio"
                          id={`width${width}`}
                          name="widthMm"
                          value={width}
                          checked={widthMm === width}
                          onChange={(e) => setWidthMm(Number(e.target.value))}
                          className="h-4 w-4 border-gray-300 text-blue-600"
                        />
                        <label htmlFor={`width${width}`} className="ml-2 text-sm text-gray-700">
                          {width}mm
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Length</label>
                  <UnitConverter 
                    unitOne="m"
                    unitTwo="yard"
                    maxValue={100}
                    minValue={1}
                    nameOne="lengthM"
                    nameTwo="lengthYard"
                    onError={setHasError}
                    onValueChange={setLengthM}
                  />
                </div>
              </>
            ) : formType === 'Rod' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Length</label>
                <UnitConverter 
                  unitOne="mm"
                  unitTwo="inch"
                  maxValue={1000}
                  minValue={1}
                  nameOne="lengthMm"
                  nameTwo="lengthInch"
                  onError={setHasError}
                  onValueChange={setLengthMm}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Length</label>
                  <UnitConverter 
                    unitOne="mm"
                    unitTwo="inch"
                    maxValue={600}
                    minValue={1}
                    nameOne="lengthMm"
                    nameTwo="lengthInch"
                    onError={setHasError}
                    onValueChange={setLengthMm}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Width</label>
                  <UnitConverter 
                    unitOne="mm"
                    unitTwo="inch"
                    maxValue={600}
                    minValue={1}
                    nameOne="widthMm"
                    nameTwo="widthInch"
                    onError={setHasError}
                    onValueChange={setWidthMm}
                  />
                </div>
              </>
            )}

            {formType !== 'Film' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Machining Precision
                </label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {[
                    { id: 'Normal', value: 'Normal (±2mm)' },
                    { id: 'High', value: 'High (±0.2mm)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="radio"
                        id={item.id}
                        name="precision" 
                        value={item.value}
                        checked={precision === item.value}
                        onChange={handlePrecisionChange}
                        disabled={
                          item.id === 'High' && machiningPrecision === 'Normal (±2mm)'
                        }
                        className="h-4 w-4 border-gray-300 text-blue-600"
                      />
                      <label htmlFor={item.id} className="ml-2 text-sm text-gray-700">
                        {item.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Instructions
              </label>
              <textarea
                name="instructions"
                rows={4}
                className="w-full max-w-xl rounded-md border-gray-300 shadow-sm"
                placeholder="Please enter any additional instructions here..."
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* 数量选择 */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Quantity
                </span>
                <CustomInputNumber
                  name="quantity" 
                  defaultValue={1}
                  min={1}
                  max={10000}
                  onChange={(value) => setQuantity(value)}
                />
              </div>
              {/* 加购按钮 - 注意保留flex-1和h-full */}
              <div className="flex-1 *:h-full *:flex">
                <ButtonPrimary
                  type="submit"
                  className="w-full flex items-center justify-center gap-3"
                  disabled={fetcher.state !== 'idle' || hasError}
                >
                  <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                  <span>
                    {fetcher.state !== 'idle' ? 'Adding...' : 'Add to Cart'}
                  </span>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
