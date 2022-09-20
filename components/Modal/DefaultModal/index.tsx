import Button from "components/Forms/Button";
import { FC } from "react";

interface Props {
  message: string;
}

const DefaultModal: FC<Props> = ({ message }) => {
  return (
    <article>
      <div className="p-3">
        <span>{message}</span>
      </div>
      <Button>확인</Button>
    </article>
  );
};

export default DefaultModal;
