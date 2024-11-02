import Button, {type ButtonProps} from './Button';

export interface ButtonThirdProps extends ButtonProps {}

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = 'text-neutral-700 hover:bg-neutral-100/90 !rounded-lg underline disabled:cursor-not-allowed disabled:text-neutral-400 focus:!ring-0 focus:!outline-none focus:!ring-offset-0',
  sizeClass = 'py-3 px-2 sm:px-2.5 sm:py-3.5',
  ...args
}) => {
  return (
    <Button
      sizeClass={sizeClass}
      className={`ttnc-ButtonThird ${className}`}
      {...args}
    />
  );
};

export default ButtonThird;
