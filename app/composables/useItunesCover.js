import { useFetch } from '#imports';

export default function useItunesCover(title, artist) {
  const { data, pending, error } = $fetch('https://itunes.apple.com/search', {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
    },
    params: {
      term: `${artist} ${title}`,
      media: 'music',
      limit: 1,
    },
  });

  const coverUrl = computed(() => {
    if (data && data.resultCount > 0) {
      console.warn((data.results[0].artworkUrl100.replace('100x100bb', '512x512bb')));

      return data.results[0].artworkUrl100.replace('100x100bb', '512x512bb'); // Get 512x512 cover
    } else {
      return 'https://via.placeholder.com/512x512.png'; // Default placeholder
    }
  });

  return {
    coverUrl,
    pending,
    error,
  };
}