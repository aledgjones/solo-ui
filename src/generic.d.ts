import { FC, HTMLAttributes, DetailedHTMLProps } from "react";

type SuperFC<Props> = FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props>;
