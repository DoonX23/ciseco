export default function useSnapSlider({
  sliderRef,
}: {
  sliderRef: React.RefObject<HTMLDivElement>;
}) {
  const get_slider_item_size = () =>
    sliderRef.current?.querySelector('.mySnapItem')?.clientWidth || 0;

  function scrollToNextSlide() {
    sliderRef.current?.scrollBy({
      left: get_slider_item_size(),
      behavior: 'smooth',
    });
  }

  function scrollToPrevSlide() {
    sliderRef.current?.scrollBy({
      left: -get_slider_item_size(),
      behavior: 'smooth',
    });
  }

  return {
    scrollToNextSlide,
    scrollToPrevSlide,
  };
}
