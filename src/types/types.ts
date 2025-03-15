export interface AuthResponse {
    token: string;
}

export interface FormState {
  [key: string]: string;
}

export interface UseFormProps {
  initialState: FormState;
  onSubmit: (formData: FormState) => Promise<void>;
  validate?: (formData: FormState) => string | null;
}

export interface User {
  name: string;
  email: string;
}

export type UserIconProps = {
  onClick?: () => void;
};

export type PreferenceItem = { id: number; name: string };

export interface UserPreferences {
  categories: number[];
  sources: number[];
  authors: number[];
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url?: string;
  category: { name: string };
  author: { name: string };
  source: { name: string };
  published_at: string;
  api_source?: string;
}

export interface ArticleCardProps {
  article: Article;
  setModalArticle: (article: Article | null) => void;
}

export interface ArticleModalProps {
  modalArticle: Article | null;
  setModalArticle: (article: Article | null) => void;
}

export interface ArticlesListProps {
  articles: Article[];
  setModalArticle: (article: Article | null) => void;
}

export interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categories: { id: string; name: string }[];
  setSelectedCategory: (value: string) => void;
  sources: { id: string; name: string }[];
  setSelectedSource: (value: string) => void;
  authors: { id: string; name: string }[];
  setSelectedAuthor: (value: string) => void;
  setSelectedDate: (value: string) => void;
}