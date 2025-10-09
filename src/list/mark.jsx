import { styled } from "styled-components";

const MarkCheck = styled.input`
  width: 20px;
  height: 20px;
`;

export default function Mark({ checked, onCheck }) {
  return (
    <MarkCheck
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheck(e.target.checked)}
      className={checked ? "checked" : ""}
    />
  );
}
