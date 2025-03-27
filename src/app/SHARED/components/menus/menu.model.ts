export interface IMenuItem {
  label: string;
  link?: string;
  children?: IMenuItem[];

  leftIcon?: string;
  rightIcon?: string;
}

