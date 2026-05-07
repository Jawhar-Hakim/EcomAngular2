export interface Category {
  id: number;
  name: string;
  description?: string;
  parent?: Category;
  children?: Category[];
}

export interface CategoryRequest {
  name: string;
  description?: string;
  parentId?: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
}
