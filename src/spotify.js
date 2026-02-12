import { useEffect, useState } from 'react';
import axios from 'axios'; // Pastikan install axios dulu: npm install axios

// --- KREDENSIAL (JANGAN DIUBAH LAGI) ---
const CLIENT_ID = '2e9a727831f54785aa1960a923dab235';
const CLIENT_SECRET = '2e565d5c40ca4ffe961636b82b4dd168';
const REFRESH_TOKEN = 'AQACwGOVOmqVrfVoXu7dtCK4QTR2iYs8_tDHgn755RRiSu4HXlsQAgt1xQ06m-jIvJuAEd9uFDCfkRxAc28sCJcFVfL70BU1syx4AShatvHLpIs6cadm4P2fY_XjchlIPyI';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export const useSpotify = () => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccessToken = async () => {
      const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', REFRESH_TOKEN);

      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      return response.json();
    };

    const fetchNowPlaying = async () => {
      try {
        const { access_token } = await getAccessToken();
        
        const response = await fetch(NOW_PLAYING_ENDPOINT, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (response.status === 204 || response.status > 400) {
          setIsPlaying(false);
          return;
        }

        const data = await response.json();
        
        if (data && data.item) {
          setSong({
            title: data.item.name,
            artist: data.item.artists.map((_artist) => _artist.name).join(', '),
            albumArt: data.item.album.images[0].url,
            link: data.item.external_urls.spotify,
          });
          setIsPlaying(data.is_playing);
        }
      } catch (e) {
        console.error("Spotify Error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Cek lagu tiap 10 detik
    const interval = setInterval(fetchNowPlaying, 10000); 
    return () => clearInterval(interval);
  }, []);

  return { song, isPlaying, loading };
};