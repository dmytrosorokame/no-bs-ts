import React from "react";

export const ButtonWrapper: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title: string }
> = ({ title, ...props }) => <button {...props}>{title}</button>;
