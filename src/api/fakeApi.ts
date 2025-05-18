import type { NewsItem } from './types';

export const fetchNews = (): Promise<NewsItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      fetch(`${import.meta.env.BASE_URL}news.json`)
        .then(res => res.json())
        .then((data: NewsItem[]) => resolve(data));
    }, 800);
  });
};

export const fetchNewsById = (id: string): Promise<NewsItem | undefined> => {
  return fetchNews().then(list => list.find(item => item.id === id));
};
