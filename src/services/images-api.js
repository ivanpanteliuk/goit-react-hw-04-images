const URL = 'https://pixabay.com/api/?';
const KEY = '34181989-96de03d33496f95df1ee3a725';

export const imagesApi = {
  async fetchImages(query, page = 1, perPage = 12) {
    const searchParams = new URLSearchParams({
      key: KEY,
      q: query,
      page: page,
      image_type: 'photo',
      per_page: perPage,
    });
    const response = await fetch(URL + searchParams);

    const data = await response.json();
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return data;
  },

  normalizeData(dataArr) {
    return dataArr.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      previewURL: webformatURL,
      largeImageURL,
      tags,
    }));
  },
};
