export interface CustomIconProps {
  width?: number;
  height?: number;
  classNames?: string;
}

export interface ServiceQuery {
  page?: number;
  pageSize?: number;
  limit?: number;
  filters?: any;
  fields?: string[] | string;
}

export interface RequestQuery {
  populate?: string[] | string | { [key: string]: string | { [key: string]: string } };
  fields?: string[] | string;
  pagination?: {
    page?: number;
    pageSize?: number;
    limit?: number;
  };
  filters?: any;
  sort?: string[] | string;
}

export interface AnimationComponent {
  show: boolean;
  onAnimationEnd: () => void;
}
