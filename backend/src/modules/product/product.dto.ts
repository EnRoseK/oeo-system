export interface createAndUpdateProductBody {
  title: string;
  description?: string;
  categoryId: string;
  remainder: number;
}

export interface updateProductParams {
  id?: string;
}
