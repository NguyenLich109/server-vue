export interface typeCategory {
    _id?: string;
    title?: string;
    url?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface typeTask {
    _id?: string;
    content?: string;
    isComplete?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface typeWork {
    idCategory?: string ;
    _id?: string;
    title?: string;
    isComplete?: boolean;
    tasks?: typeTask[];
    createdAt?: string;
    updatedAt?: string;
  }
  