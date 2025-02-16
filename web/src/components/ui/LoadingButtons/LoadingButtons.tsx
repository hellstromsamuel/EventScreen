import Button from "../Button/Button";

interface Props {
  count?: number;
}

function LoadingButtons({ count }: Props) {
  return (
    <>
      {Array.from({ length: count || 2 }).map((_, index) => (
        <Button key={index} isLoading />
      ))}
    </>
  );
}

export default LoadingButtons;
