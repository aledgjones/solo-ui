import { FC, HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

type SuperProps<Props> = Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type SuperFC<Props> = FC<SuperProps<Props>>;
